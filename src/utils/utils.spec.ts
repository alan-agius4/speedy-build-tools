import * as glob from "glob";
import * as mock from "mock-fs";
import { normalize } from "path";

import { toArray, globArray, findRoot } from "./utils";

describe("utilsSpec", () => {

	describe("toArray", () => {
		it("must convert value to array", () => {
			const value = "hello world";
			expect(toArray(value)).toEqual([value]);
		});
	});

	describe("globArray", () => {
		const files = ["test.ts", "test2.ts"];
		const specFiles = ["test.spec.ts", "test2.spec.ts"];
		const allFiles = [...files, ...specFiles];

		beforeEach(() => {
			spyOn(glob, "sync").and.returnValues(allFiles, specFiles);
		});

		it("must return files matching pattern", () => {
			expect(globArray(["*.ts"])).toEqual(allFiles);
		});

		it("must return files excluding negative pattern", () => {
			expect(globArray(["*.ts", "!*.spec.ts"])).toEqual(files);
		});
	});

	describe("findRoot", () => {
		beforeEach(() => {
			mock({
				"src/apps/": {
					"empty-dir": {}
				},
				"src/package.json": ""
			});
		});

		afterEach(() => {
			mock.restore();
		});

		it("must return the correct path to package.json", () => {
			expect(findRoot("src/apps")).toEqual(normalize("src/"));
		});

		it("must return the null when package.json doesn't exist", () => {
			expect(findRoot("invalid/path")).toEqual(null);
		});
	});
});