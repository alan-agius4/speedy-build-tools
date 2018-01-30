import { fileSystem, Logger, Timer } from "@speedy/node-core";
import * as _ from "lodash";
import { Configuration, Linter } from "tslint";

import { args, getConfigFilePath, Worker } from "../../utils";

import { ARGS } from "./lint-ts.args";
import { LintTsOptions, LintTsResult } from "./lint-ts.model";

const logger = new Logger("Lint TS");

export async function lintTs(options?: Partial<LintTsOptions>): Promise<LintTsResult> {
	const timer = new Timer(logger);
	let result: LintTsResult | undefined;
	const mergedOptions = args.mergeWithOptions(ARGS, options);

	try {
		timer.start();
		result = await Worker.run<LintTsResult>(__filename, handleLintTs.name, mergedOptions);
		return result;
	} catch (error) {
		logger.error("", error);
		throw error;
	} finally {
		timer.finish();

		if (result && result.errorCount && !mergedOptions.continueOnError) {
			process.exit(1);
		}
	}
}

/** @internal */
export async function handleLintTs(options: LintTsOptions): Promise<LintTsResult> {
	const configFilePath = getConfigFilePath(options.config);
	logger.debug(handleLintTs.name, `Config file path: ${configFilePath}`);

	const configData = Configuration.loadConfigurationFromPath(configFilePath);

	if (!configData) {
		throw new Error(`Cannot retrieve 'config' data, path: ${options.config}`);
	}

	const linter = new Linter(
		{
			fix: options.fix,
			formatter: options.formatter
		},
		Linter.createProgram(options.program)
	);

	await Promise.all(
		fileSystem.glob(options.files).map(x => lintFile(x, configData, linter))
	);

	const result = linter.getResult();
	if (!_.isEmpty(result.failures)) {
		logger.info(result.output);
	}

	return {
		failureCount: result.failures.length,
		errorCount: result.errorCount,
		fixesCount: result.fixes ? result.fixes.length : 0
	};
}

async function lintFile(filePath: string, configData: Configuration.IConfigurationFile, linter: Linter): Promise<void> {
	logger.debug(lintFile.name, `filePath: ${filePath}`);
	linter.lint(filePath, await fileSystem.readFileAsync(filePath), configData);
}