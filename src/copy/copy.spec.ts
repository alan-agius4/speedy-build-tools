import { fileSystem, Logger } from "@speedy/node-core";
import * as mockFs from "mock-fs";

import { copy } from "./copy";

describe("copySpec", () => {
	beforeEach(() => {
		mockFs({
			src: {
				"file-1.json": "",
				"file-2.js": "",
				"file-3.js": "",
				"file-4.js": ""
			}
		});

		spyOn(Logger.prototype, "info").and.stub();
		spyOn(Logger.prototype, "debug").and.stub();
	});

	afterEach(() => {
		mockFs.restore();
	});

	it("should copy path matching glob files to destination", async () => {
		await copy({
			paths: "src/*.js",
			dest: "dist"
		});

		expect(fileSystem.glob("dist/*.js").length).toBe(3);
	});

	it("should copy to various destinations", async () => {
		await copy([
			{
				paths: "src/*.js",
				dest: "dist"
			},
			{
				paths: "src/*.js",
				dest: "dist2"
			}
		]);

		expect(fileSystem.glob("dist/*.js").length).toBe(3);
		expect(fileSystem.glob("dist2/*.js").length).toBe(3);
	});

});