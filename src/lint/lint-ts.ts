import { Linter, LintResult, Configuration } from "tslint";
import { resolve } from "path";
import { CommandModule, Argv, argv } from "yargs";

import {
	Logger,
	Worker,
	Timer,
	readFileAsync,
	globArray,
	toArray,
	Args,
	Arguments
} from "../utils";

const logger = new Logger("Lint TS");
const timer = new Timer(logger);
let configData: Configuration.IConfigurationLoadResult;

interface LintTSArguments extends Arguments {
	files: string[];
	config: string;
	continueOnError: boolean;
}

export function lintTs(files?: string | string[], config?: string): Promise<LintResult[]> {
	timer.start();

	return Worker.run(__filename, lintTsWorker.name, files)
		.then(x => {
			timer.finish();
			return x;
		})
		.catch(error => logger.error(null, error));
}

export function lintTsWorker(files?: string | string[], config?: string): Promise<LintResult[]> {
	const args = setupArgs<LintTSArguments>();

	if (!files) {
		files = args.files;
	}

	if (!config) {
		config = args.config;
	}

	configData = Configuration.findConfiguration(null, config).results!;
	const promises = globArray(toArray(files)).map(x => lintFile(x));

	return Promise
		.all(promises)
		.then(result => {
			const failures = result.filter(x => x.failureCount > 0);
			failures.forEach(x => logger.info(x.output));

			if (!args.continueOnError) {
				process.exit(1);
			}

			return failures;
		});
}

function lintFile(filePath: string): Promise<LintResult> {
	return readFileAsync(filePath)
		.then(fileContents => {
			const linter = new Linter({
				formatter: "stylish",
				fix: false
			});

			linter.lint(filePath, fileContents, configData);

			return linter.getResult();
		});
}

function setupArgs<T>(yargs?: Argv): T {
	Args.setBoolean("continueOnError", false);
	Args.set("files", "./src/**/*.ts", "f");
	Args.set("config", resolve(__dirname, "../tslint.json"), "c");
	return yargs ? yargs.argv : argv;
}

export const tsLintModule: CommandModule = {
	command: "lint-ts",
	describe: "Lint typescript files",
	builder: setupArgs,
	handler: lintTs
};