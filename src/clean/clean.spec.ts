import { fileSystem, Logger, Timer } from "@speedy/node-core";
import * as mockFs from "mock-fs";

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

		await clean({ paths });
		expect(fileSystem.glob(paths).length).toBe(0);

		done();
	});

	it("should not delete path matching negative glob", async done => {
		const paths = [
			"**/*",
			"!**/src",
			"!**/sub-dir",
			"!**/file-1.json"
		];

		await clean({ paths });
		expect(fileSystem.glob("**/file-1.json").length).toBeGreaterThan(0);

		done();
	});

});
