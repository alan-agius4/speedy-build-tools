import * as mockFs from "mock-fs";

import { Logger, glob, Timer } from "../utils";
import { clean } from "./clean";

describe("cleanSpec", () => {

	beforeEach(() => {
		mockFs({
			src: {
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
						"file-3.json": ""
					}
				}
			}
		});

		spyOn(Timer.prototype, "finish").and.stub();
		spyOn(Timer.prototype, "start").and.stub();
		spyOn(Logger.prototype, "info").and.stub();
		spyOn(Logger.prototype, "debug").and.stub();
	});

	afterEach(() => {
		mockFs.restore();
	});

	it("should delete path matching glob", async done => {
		const paths = [
			"**/*.txt",
			"**/*.json"
		];

		const result = await clean({ paths });
		expect(result).toBe(true);
		expect(glob(paths).length).toBeFalsy();

		done();
	});

	it("should not delete path matching negative glob", async done => {
		const paths = [
			"**/*",
			"!**/src",
			"!**/sub-dir",
			"!**/file-1.json"
		];

		const result = await clean({ paths });
		expect(result).toBe(true);
		expect(glob("**/file-1.json").length).toBe(1);

		done();
	});

});
