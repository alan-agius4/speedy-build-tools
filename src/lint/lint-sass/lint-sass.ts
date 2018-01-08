import { Logger, Timer, fileSystem } from "@speedy/node-core";
import { lint, LinterResult, formatters } from "stylelint";
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

		if (result && result.errored && !mergedOptions.continueOnError) {
			process.exit(1);
		}
	}
}

/** @internal */
export async function handleLintSass(options: LintSassOptions): Promise<LinterResult> {
	const configFilePath = getConfigFilePath(options.config);
	logger.debug(handleLintSass.name, `Config file path: ${configFilePath}`);

	const [configData, files] = await Promise.all([
		fileSystem.readJsonFileAsync<JSON>(configFilePath),
		fileSystem.glob(options.files)
	]);

	const result = await lint({
		config: configData,
		formatter: options.formatter,
		files,
		fix: options.fix
	});

	if (result.errored) {
		result.results.forEach(x => logger.info(formatters.string([x])));
	}

	return result;
}