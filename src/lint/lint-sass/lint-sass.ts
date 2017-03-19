import * as stylefmt from "stylefmt";
import * as postcss from "postcss";
import { writeFileSync } from "fs";
import { lint, LinterResult, formatters, LinterOptions } from "stylelint";

import {
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

import { LintSassOptions } from "./lint-sass.model";
import { ARGS } from "./lint-sass.args";

const logger = new Logger("Lint SASS");

export async function lintSass(options?: Partial<LintSassOptions>): Promise<LinterResult[]> {
	const timer = new Timer(logger);

	try {
		timer.start();
		const mergedOptions = Args.mergeWithOptions(ARGS, options);
		return await Worker.run<LinterResult[]>(__filename, handleLintSass.name, mergedOptions);
	} catch (error) {
		logger.error("", error);
		throw error;
	} finally {
		timer.finish();
	}
}

/** @internal */
export async function handleLintSass(options: LintSassOptions): Promise<LinterResult[]> {
	const configFilePath = getConfigFilePath(options.config);
	logger.debug("handleLintSass", `Config file path: ${configFilePath}`);

	const configData = await readJsonFileAsync<JSON>(configFilePath);

	const failures = (
		await Promise.all(
			glob(options.files).map(x => lintFile(x, configData, options))
		)
	).filter(x => x.errored);

	failures.forEach(x => logger.info(formatters.string(x.results)));

	if (failures.length && !options.continueOnError) {
		process.exit(1);
	}

	return failures;
}

async function lintFile(filePath: string, configData: JSON, options: LintSassOptions): Promise<LinterResult> {
	const fileContent = await readFileAsync(filePath);

	const lintOptions: LinterOptions = {
		config: configData,
		codeFilename: filePath,
		formatter: options.formatter,
		code: fileContent
	};

	const lintResult = await lint(lintOptions);

	if (!lintResult.errored || (lintResult.errored && !options.fix)) {
		return lintResult;
	}

	// let's try to fix lint issues
	const result = await postcss([
		stylefmt({ configFile: options.config })
	]).process(fileContent, {
		from: filePath
	});

	const fixedFilesContent = result.css;

	if (fixedFilesContent === fileContent) {
		logger.debug(lintFile.name, `Cannot fix lint issues, file: ${filePath}`);
		return lintResult;
	}

	logger.debug(lintFile.name, `Fixed some lint issues, file: ${filePath}`);
	writeFileSync(filePath, fixedFilesContent);

	lintOptions.code = fixedFilesContent;
	return await lint(lintOptions);
}

/** @internal */
export const lintSassModule = buildCommandModule({
	command: "lint-sass",
	description: "Lint Sass files",
	handler: lintSass,
	args: ARGS
});