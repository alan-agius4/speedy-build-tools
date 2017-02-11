import * as glob from "glob";

import { toArray, globArray } from "./utils";

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
  
});