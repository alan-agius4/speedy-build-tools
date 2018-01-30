import { fileSystem, Logger, Timer } from "@speedy/node-core";
import chalk from "chalk";
import { HTMLHint, RuleSet } from "htmlhint";
import * as _ from "lodash";

import { args, getConfigFilePath, Worker } from "../../utils";

import { ARGS } from "./lint-html.args";
import { HtmlLintResult, LintHtmlOptions } from "./lint-html.model";

const logger = new Logger("Lint HTML");

export async function lintHtml(options?: Partial<LintHtmlOptions>): Promise<HtmlLintResult[]> {
	const timer = new Timer(logger);
	let result: HtmlLintResult[] | undefined;
	const mergedOptions = args.mergeWithOptions(ARGS, options);

	try {
		timer.start();
		result = await Worker.run<HtmlLintResult[]>(__filename, handleLintHtml.name, mergedOptions);
		return result;
	} catch (error) {
		logger.error("", error);
		throw error;
	} finally {
		timer.finish();

		if (result && result.length && !mergedOptions.continueOnError) {
			process.exit(1);
		}
	}
}

/** @internal */
export async function handleLintHtml(options: LintHtmlOptions): Promise<HtmlLintResult[]> {
	const configFilePath = getConfigFilePath(options.config);
	logger.debug(handleLintHtml.name, `Config file path: ${configFilePath}`);
	const rules = await fileSystem.readJsonFileAsync<RuleSet>(configFilePath);

	const failures = _.filter(
		await Promise.all(
			fileSystem.glob(options.files).map(x => lintFile(x, rules))
		),
		x => !_.isEmpty(x.result)
	);

	failures.forEach(x => logger.info(formatFailuresForFile(x)));
	return failures;
}

async function lintFile(filePath: string, configData: RuleSet): Promise<HtmlLintResult> {
	logger.debug(lintFile.name, `filePath: ${filePath}`);

	return {
		result: HTMLHint.verify(await fileSystem.readFileAsync(filePath), configData),
		filePath
	};
}

function formatFailuresForFile(failure: HtmlLintResult): string {
	let message = `\n${failure.filePath.replace(fileSystem.getRootPath(), "")}`;

	for (const error of failure.result) {
		message += `\n${chalk.red(`ERROR: ${error.line}:${error.col}`)}  ${chalk.gray(`${error.rule.id}`)}  ${chalk.yellow(error.message)}`;
	}

	return `\n ${message} \n`;
}