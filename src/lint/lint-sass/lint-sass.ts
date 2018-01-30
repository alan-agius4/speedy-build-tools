import { fileSystem, Logger, Timer } from "@speedy/node-core";
import { formatters, lint, LinterResult } from "stylelint";

import { args, getConfigFilePath, Worker } from "../../utils";

import { ARGS } from "./lint-sass.args";
import { LintSassOptions } from "./lint-sass.model";

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
		result.results
			.filter(x => x.errored)
			.forEach(x => logger.info(formatters.string([x])));
	}

	return result;
}