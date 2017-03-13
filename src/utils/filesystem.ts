import * as _ from "lodash";
import * as rimraf from "rimraf";
import { sync } from "fast-glob";
import { readFile, statSync, existsSync } from "fs";
import { join, sep, normalize, isAbsolute } from "path";

let _rootPath: string | null;
export function getRootPath(): string {
	if (!_.isNil(_rootPath)) {
		return _rootPath;
	}

	_rootPath = findFileRecursively();
	if (!_rootPath) {
		_rootPath = "";
	}

	return _rootPath;
}

export function deleteAsync(path: string): Promise<boolean> {
	return new Promise((resolve, reject) => {
		rimraf(path, error => {
			if (error) {
				return reject(error);
			}

			return resolve(true);
		});
	});
}

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

export async function readJsonFileAsync<T>(path: string): Promise<T> {
	return JSON.parse(await readFileAsync(path));
}

export function globArray(source: string | string[]): string[] {
	// empty bashNative is required to fix the below issue on MAC OSX
	// https://github.com/jonschlinkert/bash-glob/issues/2#issuecomment-285879264

	return sync(source, { bashNative: [] });
}

export function toArray<T>(pattern: T | T[]): T[] {
	if (!_.isArray(pattern)) {
		return [pattern];
	}

	return pattern;
}

/**
 * Find a file recursively in the filesystem from the starting path upwards.
 *
 * Defaults: fileName: package.json, startPath: process.cwd()
 *
 * @export
 * @param {string} [fileName="package.json"]
 * @param {string} [startPath=process.cwd()]
 * @returns {(string | null)}
 */
export function findFileRecursively(fileName = "package.json", startPath = process.cwd()): string | null {
	startPath = normalize(startPath);

	try {
		const directory = join(startPath, sep);
		statSync(join(directory, fileName));
		return directory;
	} catch (error) {
		// do nothing
	}

	let position = _.lastIndexOf(startPath, sep);
	if (position < 0) {
		return null;
	}

	const truncatedPath = startPath.substr(0, position++);
	return findFileRecursively(fileName, truncatedPath);
}

export function getConfigFilePath(file: string): string {
	if (isAbsolute(file)) {
		return file;
	}

	const path = join(getRootPath(), file);

	if (existsSync(path)) {
		return path;
	}

	return join(__dirname, "../../", file);
}