import * as Linter from "tslint";

import { Logger } from "../utils/logger";
import { Timer } from "../utils/timer";
import { Worker } from "../utils/worker/worker.client";
import { readFileAsync, globArray, toArray } from "../utils";

import { LintResult } from "./lint-ts.model";

const logger = new Logger("Lint TS");
const timer = new Timer(logger);

export function lintTs(pattern: string | string[]): Promise<{}> {
	timer.start();

	return Worker.run(__filename, "lintTsWorker", pattern)
		.then(x => {
			timer.finish();
			return x;
		})
		.catch((error: any) => logger.error(error));
}

export function lintTsWorker(pattern: string | string[]): Promise<any> {
	const promises = globArray(toArray<string>(pattern)).map(x => lintFile(x));
	return Promise.all(promises);
}

export function lintFile(filePath: string): Promise<LintResult> {
	return readFileAsync(filePath)
		.then((fileContents: string) => {
			const linter = new Linter(filePath, fileContents, {
				configuration: {},
				formatter: null!,
				formattersDirectory: null!,
				rulesDirectory: null!
			});

			return {
				filePath: filePath,
				failures: linter.lint().failures
			};
		});

}