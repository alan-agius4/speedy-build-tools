import { readFile } from "fs";
import { IOptions, sync } from "glob";
import { pullAll, isArray } from "lodash";

export function readFileAsync(path: string): Promise<string> {
	return new Promise((resolve, reject) => {
		readFile(path, "utf-8", (error, data) => {
			if (error) {
				return reject(error);
			}

			return resolve(data);
		});
	});
}

export function globArray(patterns: string[], options: IOptions = {}): string[] {
	let fileMatches: string[] = [];

	for (let pattern of patterns) {
		const patternMatches = sync(pattern, options);
		fileMatches = pattern.startsWith("!") ? pullAll(fileMatches, patternMatches) : [...fileMatches, ...patternMatches];
	}

	return fileMatches;
}

export function toArray<T>(pattern: T | T[]): T[] {
	if (!isArray(pattern)) {
		return [pattern];
	}

	return pattern;
}