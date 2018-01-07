import { Logger, Timer, fileSystem } from "@speedy/node-core";
import { lint, LinterResult, formatters, LinterOptions } from "stylelint";
import { Worker, args, getConfigFilePath } from "../../utils";
import { LintSassOptions } from "./lint-sass.model";
import { ARGS } from "./lint-sass.args";

const logger = new Logger("Lint SASS");

export async function lintSass(options?: Partial<LintSassOptions>): Promise<LinterResult> {
	const timer = new Timer(logger);
	let result: LinterResult | undefined;
	const mergedOptions = args.mergeWithOptions(ARGS, options);

	try {
		timer.start();
		result = await Worker.run<LinterResult>(__filename, handleLintSass.name, mergedOptions);
		return result;
	} catch (error) {
		logger.error("", error);
		throw error;
	} finally {
		timer.finish();

		if (result && !mergedOptions.continueOnError) {
			process.exit(1);
		}
	}
}

/** @internal */
export async function handleLintSass(options: LintSassOptions): Promise<LinterResult> {
	const configFilePath = getConfigFilePath(options.config);
	logger.debug(handleLintSass.name, `Config file path: ${configFilePath}`);

	const configData = await fileSystem.readJsonFileAsync<JSON>(configFilePath);
	const lintOptions: LinterOptions = {
		config: configData,
		formatter: options.formatter,
		files: options.files,
		fix: options.fix
	} as any;

	const failures = await lint(lintOptions);

	if (failures.errored) {
		failures.results.forEach(x => logger.info(formatters.string([x])));
	}

	return failures;
}