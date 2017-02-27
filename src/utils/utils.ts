import { readFile, statSync } from "fs";
import { IOptions, sync } from "glob";
import { pullAll, isArray } from "lodash";
import { join, sep, normalize } from "path";
import { lastIndexOf } from "lodash";

import { Logger } from "./logger";

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

export function findRoot(filePath?: string): string | null {
	filePath = filePath || process.cwd();

	try {
		const directory = join(normalize(filePath), sep);
		statSync(join(directory, "package.json"));
		return directory;
	} catch (e) {
	}

	let position = lastIndexOf(filePath, sep);
	if (position < 0) {
		return null;
	}

	const truncatedPath = filePath.substr(0, position++);

	return findRoot(truncatedPath);
}