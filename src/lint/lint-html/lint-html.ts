import * as _ from "lodash";
import { HTMLHint, RuleSet } from "htmlhint";
import { yellow, white, red } from "chalk";

import {
	getRootPath,
	Logger,
	Worker,
	Timer,
	Args,
	readJsonFileAsync,
	readFileAsync,
	glob,
	buildCommandModule,
	getConfigFilePath
} from "../../utils";

import { LintHtmlOptions, HtmlLintResult } from "./lint-html.model";
import { ARGS } from "./lint-html.args";

const logger = new Logger("Lint HTML");

export async function lintHtml(options?: Partial<LintHtmlOptions>): Promise<HtmlLintResult[]> {
	const timer = new Timer(logger);

	try {
		timer.start();
		const mergedOptions = Args.mergeWithOptions(ARGS, options);
		return await Worker.run<HtmlLintResult[]>(__filename, handleLintHtml.name, mergedOptions);
	} catch (error) {
		logger.error("", error);
		throw error;
	} finally {
		timer.finish();
	}
}

/** @internal */
export async function handleLintHtml(options: LintHtmlOptions): Promise<HtmlLintResult[]> {
	const configFilePath = getConfigFilePath(options.config);
	logger.debug(handleLintHtml.name, `Config file path: ${configFilePath}`);
	const rules = await readJsonFileAsync<RuleSet>(configFilePath);

	const failures = _.filter(
		await Promise.all(
			glob(options.files).map(x => lintFile(x, rules))
		),
		x => !_.isEmpty(x.result)
	);

	failures.forEach(x => logger.info(formatFailuresForFile(x)));

	if (failures.length && !options.continueOnError) {
		process.exit(1);
	}

	return failures;
}

async function lintFile(filePath: string, configData: RuleSet): Promise<HtmlLintResult> {
	logger.debug(lintFile.name, `filePath: ${filePath}`);

	return {
		result: HTMLHint.verify(await readFileAsync(filePath), configData),
		filePath: filePath
	};
}

function formatFailuresForFile(failure: HtmlLintResult): string {
	let message = `\n${failure.filePath.replace(getRootPath(), "")}`;

	for (const error of failure.result) {
		message += `\n${red(`${error.line}:${error.col}`)}: ${white(error.message)} ${yellow(`(${error.rule.id})`)}`;
	}

	return `\n ${message} \n`;
}

/** @internal */
export const lintHtmlModule = buildCommandModule({
	command: "lint-html",
	description: "Lint Html files",
	handler: lintHtml,
	args: ARGS
});