import * as _ from "lodash";
import { readFile, statSync, existsSync } from "fs";
import { join, sep, normalize, isAbsolute } from "path";

let _rootPath: string | null;
export function getRootPath(): string {
	if (!_.isNil(_rootPath)) {
		return _rootPath;
	}

	_rootPath = findRoot();
	if (!_rootPath) {
		_rootPath = "";
	}

	return _rootPath;
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

export function toArray<T>(pattern: T | T[]): T[] {
	if (!_.isArray(pattern)) {
		return [pattern];
	}

	return pattern;
}

export function findRoot(fileName?: string, filePath?: string): string | null {
	filePath = normalize(filePath || process.cwd());

	try {
		const directory = join(filePath, sep);
		statSync(join(directory, fileName ? fileName : "package.json"));
		return directory;
	} catch (error) {
		// do nothing
	}

	let position = _.lastIndexOf(filePath, sep);
	if (position < 0) {
		return null;
	}

	const truncatedPath = filePath.substr(0, position++);
	return findRoot(fileName, truncatedPath);
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