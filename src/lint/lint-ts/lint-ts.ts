import { Linter, Configuration } from "tslint";

import {
	Logger,
	Worker,
	Timer,
	readFileAsync,
	buildCommandModule,
	Args,
	glob,
	getConfigFilePath,
	readJsonFileAsync
} from "../../utils";

import { LintTsOptions, LintTsResult } from "./lint-ts.model";
import { ARGS } from "./lint-ts.args";

const logger = new Logger("Lint TS");

export async function lintTs(options?: Partial<LintTsOptions>): Promise<LintTsResult> {
	const timer = new Timer(logger);

	try {
		timer.start();
		const mergedOptions = Args.mergeWithOptions(ARGS, options);
		return await Worker.run<LintTsResult>(__filename, handleLintTs.name, mergedOptions);
	} catch (error) {
		logger.error("", error);
		throw error;
	} finally {
		timer.finish();
	}
}

/** @internal */
export async function handleLintTs(options: LintTsOptions): Promise<LintTsResult> {
	const configFilePath = getConfigFilePath(options.config);
	logger.debug(handleLintTs.name, `Config file path: ${configFilePath}`);

	const configData = await readJsonFileAsync<Configuration.IConfigurationLoadResult>(configFilePath);

	if (!configData) {
		throw new Error(`Cannot retrieve 'config' data, path: ${options.config}`);
	}

	const linter = new Linter({
		fix: options.fix,
		formatter: options.formatter
	});

	await Promise.all(
		glob(options.files).map(x => lintFile(x, configData, linter))
	);

	const result = linter.getResult();
	if (result.failureCount > 0) {
		logger.info(result.output);
		if (!options.continueOnError) {
			process.exit(1);
		}
	}

	return {
		failuresCount: result.failureCount,
		fixesCount: result.fixes ? result.fixes.length : undefined
	};
}

async function lintFile(filePath: string, configData: Configuration.IConfigurationLoadResult, linter: Linter): Promise<void> {
	logger.debug(lintFile.name, `filePath: ${filePath}`);
	linter.lint(filePath, await readFileAsync(filePath), configData);
}

/** @internal */
export const lintTsModule = buildCommandModule({
	command: "lint-ts",
	description: "Lint TypeScript files",
	handler: lintTs,
	args: ARGS
});