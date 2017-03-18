import * as mockFs from "mock-fs";
import { normalize } from "path";

import { findFileRecursively, readFileAsync, readJsonFileAsync } from "./file-system";

describe("fileSystemSpec", () => {

	describe("readFileAsync", () => {
		beforeEach(() => {
			mockFs({
				"file.txt": "hello world"
			});
		});

		afterEach(() => {
			mockFs.restore();
		});

		it("should reject promise when file is not found", async done => {
			try {
				await readFileAsync("invalid.txt");
			} catch (error) {
				expect(error).toBeTruthy();
			}

			done();
		});

		it("should return file content when file exists", async done => {
			const x = await readFileAsync("file.txt");
			expect(x).toBe("hello world");
			done();
		});
	});

	describe("readJsonFileAsync", () => {
		const json = {
			"id": 10,
			text: "hello world"
		};

		beforeEach(() => {
			mockFs({
				"file.json": JSON.stringify(json)
			});
		});

		afterEach(() => {
			mockFs.restore();
		});

		it("should reject promise when file is not found", async done => {
			try {
				await readJsonFileAsync("invalid.json");
			} catch (error) {
				expect(error).toBeTruthy();
			}

			done();
		});

		it("should return file content as object when file exists", async done => {
			const x = await readJsonFileAsync("file.json");
			expect(x).toEqual(json);
			done();
		});
	});

	describe("findFileRecursively", () => {
		beforeEach(() => {
			mockFs({
				"src/apps/": {
					"empty-dir": {}
				},
				"src/package.json": ""
			});
		});

		afterEach(() => {
			mockFs.restore();
		});

		it("should return the correct path to package.json", () => {
			expect(findFileRecursively("package.json", "src/apps/")).toEqual(normalize("src/"));
		});

		it("should return the null when package.json doesn't exist", () => {
			expect(findFileRecursively("package.json", "invalid/path")).toEqual(null);
		});
	});
});