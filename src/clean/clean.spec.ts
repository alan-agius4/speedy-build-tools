import * as mockFs from "mock-fs";

import { Logger, globArray } from "../utils";
import { clean } from "./clean";

describe("cleanSpec", () => {

	beforeEach(() => {
		mockFs({
			"src": {
				"file-1.txt": "",
				"file-2.txt": "",
				"file-3.txt": "",
				"file-4.txt": "",
				"sub-dir": {
					"file-1.txt": "",
					"file-2.txt": "",
					"file-3.txt": "",
					"file-4.txt": "",
					"sub-dir": {
						"file-1.json": "",
						"file-2.json": "",
						"file-3.json": "",
					}
				}
			}
		});

		spyOn(Logger.prototype, "info").and.stub();
		spyOn(Logger.prototype, "debug").and.stub();
	});

	afterEach(() => {
		mockFs.restore();
	});

	it("must delete path matching glob", async done => {
		const paths = [
			"**/*.txt",
			"**/*.json"
		];

		const result = await clean({ paths });
		expect(result).toBe(true);
		expect(globArray(paths).length).toBeFalsy();

		done();
	});

	it("must not delete path matching negative glob", async done => {
		const paths = [
			"**/*",
			"!**/src",
			"!**/sub-dir",
			"!**/file-1.json"
		];

		const result = await clean({ paths });
		expect(result).toBe(true);
		expect(globArray("**/file-1.json").length).toBeTruthy();

		done();
	});

});