import { Linter, LintResult, Configuration } from "tslint";

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

import { LintTsOptions } from "./lint-ts.model";
import { ARGS } from "./lint-ts.args";

const logger = new Logger("Lint TS");

export async function lintTs(options?: Partial<LintTsOptions>): Promise<LintResult[]> {
	const timer = new Timer(logger);

	try {
		timer.start();
		const mergedOptions = Args.mergeWithOptions(ARGS, options);
		return await Worker.run<LintResult[]>(__filename, handlelintTs.name, mergedOptions);
	} catch (error) {
		logger.error("", error);
		throw error;
	} finally {
		timer.finish();
	}
}

/** @internal */
export async function handlelintTs(options: LintTsOptions): Promise<LintResult[]> {
	const configFilePath = getConfigFilePath(options.config);
	logger.debug(handlelintTs.name, `Config file path: ${configFilePath}`);

	const configData = await readJsonFileAsync<Configuration.IConfigurationLoadResult>(configFilePath);

	if (!configData) {
		throw new Error(`Cannot retrieve 'config' data, path: ${options.config}`);
	}

	const linter = new Linter({
		fix: options.fix,
		formatter: options.formatter
	});

	const failures = (
		await Promise.all(
			glob(options.files).map(x => lintFile(x, configData, linter))
		)
	).filter(x => x.failureCount > 0);

	failures.forEach(x => logger.info(x.output));

	if (failures.length && !options.continueOnError) {
		process.exit(1);
	}

	return failures;
}

async function lintFile(filePath: string, configData: Configuration.IConfigurationLoadResult, linter: Linter): Promise<LintResult> {
	logger.debug(lintFile.name, `filePath: ${filePath}`);
	linter.lint(filePath, await readFileAsync(filePath), configData);

	return linter.getResult();
}

/** @internal */
export const lintTsModule = buildCommandModule({
	command: "lint-ts",
	description: "Lint Typescript files",
	handler: lintTs,
	args: ARGS
});