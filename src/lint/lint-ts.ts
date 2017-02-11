import { Linter, LintResult } from "tslint";

import { Logger } from "../utils/logger";
import { Timer } from "../utils/timer";
import { Worker } from "../utils/worker/worker.client";
import { readFileAsync, globArray, toArray } from "../utils/utils";

const logger = new Logger("Lint TS");
const timer = new Timer(logger);

export function lintTs(pattern: string | string[]): Promise<{}> {
	timer.start();

	return Worker.run(__filename, "lintTsWorker", pattern)
		.then(x => {
			timer.finish();
			return x;
		})
		.catch(error => logger.error(error));
}

export function lintTsWorker(pattern: string | string[]): Promise<LintResult[]> {
	const promises = globArray(toArray(pattern)).map(x => lintFile(x));
	return Promise.all(promises);
}

export function lintFile(filePath: string): Promise<LintResult> {
	return readFileAsync(filePath)
		.then(fileContents => {
			const linter = new Linter({
				formatter: null!,
				formattersDirectory: null!,
				rulesDirectory: null!,
				fix: false
			});

			linter.lint(filePath, fileContents, {});

			return linter.getResult();
		});
}