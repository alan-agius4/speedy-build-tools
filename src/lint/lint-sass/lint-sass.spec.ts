import * as mockFs from "mock-fs";

import { Logger } from "../../utils";
import { handleLintSass } from "./lint-sass";
import { LintSassOptions } from "./lint-sass.model";

describe("lintSassSpec", () => {

	const OPTIONS: LintSassOptions = {
		config: ".stylelintrc",
		continueOnError: true,
		formatter: "verbose",
		fix: false,
		files: []
	};

	beforeEach(() => {
		mockFs({
			"src/invalid.scss": "a {color: red}",
			"src/can-fix.scss": "div {width: 10.0em}",
			"src/valid.scss": "a {color: #000}",
			"package.json": "",
			".stylelintrc": `{
				"rules": {
					"color-named": "never",
					"number-no-trailing-zeros": true
				}
			}`
		});

		spyOn(Logger.prototype, "info").and.stub();
		spyOn(Logger.prototype, "debug").and.stub();
	});

	afterEach(() => {
		mockFs.restore();
	});

	it("should return errors when incorrect SASS is present", async done => {
		const result = await handleLintSass({
			...OPTIONS,
			files: "**/*.scss"
		});

		expect(result.length).toBeTruthy();
		done();
	});

	it("should not return errors when SASS is valid", async done => {
		const result = await handleLintSass({
			...OPTIONS,
			files: "src/valid.scss"
		});

		expect(result.length).toBeFalsy();
		done();
	});

	it("should fix errors when `fix` parameter is set to true", async done => {
		const result = await handleLintSass({
			...OPTIONS,
			files: "src/can-fix.scss",
			fix: true
		});

		expect(result.length).toBeFalsy();
		done();
	});

	it("should not fix errors when `fix` parameter is set to false", async done => {
		const result = await handleLintSass({
			...OPTIONS,
			files: "src/can-fix.scss"
		});

		expect(result.length).toBeTruthy();
		done();
	});

});