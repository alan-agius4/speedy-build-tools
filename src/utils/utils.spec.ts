import * as mockFs from "mock-fs";
import { normalize } from "path";

import {
	toArray,
	findRoot,
	readFileAsync,
	readJsonFileAsync
} from "./index";

describe("utilsSpec", () => {

	describe("readFileAsync", () => {
		beforeEach(() => {
			mockFs({
				"file.txt": "hello world"
			});
		});

		afterEach(() => {
			mockFs.restore();
		});

		it("must reject promise when file is not found", async done => {
			try {
				await readFileAsync("invalid.txt");
			} catch (error) {
				expect(error).toBeTruthy();
			}

			done();

		});

		it("must return file content when file exists", async done => {
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

		it("must reject promise when file is not found", async done => {
			try {
				await readJsonFileAsync("invalid.json");
			} catch (error) {
				expect(error).toBeTruthy();
			}

			done();
		});

		it("must return file content as object when file exists", async done => {
			const x = await readJsonFileAsync("file.json");
			expect(x).toEqual(json);
			done();
		});
	});

	describe("toArray", () => {
		it("must convert value to array", () => {
			const value = "hello world";
			expect(toArray(value)).toEqual([value]);
		});
	});

	describe("findRoot", () => {
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

		it("must return the correct path to package.json", () => {
			expect(findRoot("package.json", "src/apps/")).toEqual(normalize("src/"));
		});

		it("must return the null when package.json doesn't exist", () => {
			expect(findRoot("package.json", "invalid/path")).toEqual(null);
		});
	});
});