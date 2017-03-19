import * as mockFs from "mock-fs";
import { Logger } from "../../utils";

import { handleLintHtml } from "./lint-html";

describe("lintHtmlSpec", () => {

	describe("handleLintHtml", () => {
		beforeEach(() => {
			mockFs({
				"src/invalid.html": "<span obgTag></span>",
				"src/valid.html": "<span obgtag></span>",
				".htmlhintrc": `{"attr-lowercase": true}`
			});

			spyOn(Logger.prototype, "info").and.stub();
			spyOn(Logger.prototype, "debug").and.stub();
		});

		afterEach(() => {
			mockFs.restore();
		});

		it("should return errors when incorrect HTML is present", done => {
			handleLintHtml({
				files: "src/**/*.html",
				config: ".htmlhintrc",
				continueOnError: true
			})
				.then(result => {
					expect(result).toBeTruthy();
					done();
				});
		});

		it("should not return errors when HTML is valid", done => {
			handleLintHtml({
				files: "src/valid.html",
				config: ".htmlhintrc",
				continueOnError: true
			})
				.then(result => {
					expect(result.length).toBeFalsy();
					done();
				});
		});

	});

});