import { uniqueId } from "lodash";
import { copySync } from "cpx";
import { join, resolve } from "path";
import { Logger, fileSystem } from "@speedy/node-core";

import { handleLintSass } from "./lint-sass";
import { LintSassOptions } from "./lint-sass.model";

const MOCK_DIR = join(__dirname.replace("test", "src"), "mocks");
const TEST_DIR = resolve("./test", uniqueId("scss"));
const getPath = (path: string) => join(TEST_DIR, path);

describe("lintSassSpec", () => {
	const OPTIONS: LintSassOptions = {
		config: getPath("stylelintrc"),
		continueOnError: true,
		formatter: "verbose",
		fix: false,
		files: []
	};

	beforeEach(() => {
		copySync(`${MOCK_DIR}/**/*`, TEST_DIR);
		spyOn(Logger.prototype, "info").and.stub();
		spyOn(Logger.prototype, "debug").and.stub();
	});

	afterEach(async () => {
		await fileSystem.deleteAsync(TEST_DIR);
	});

	it("should return errors when incorrect SASS is present", async done => {
		const result = await handleLintSass({
			...OPTIONS,
			files: getPath("**/*.scss")
		});

		expect(result.errored).toBe(true);
		done();
	});

	it("should not return errors when SASS is valid", async done => {
		const result = await handleLintSass({
			...OPTIONS,
			files: getPath("valid.scss")
		});

		expect(result.errored).toBe(false);
		done();
	});

	it("should fix errors when `fix` parameter is set to true", async done => {
		const result = await handleLintSass({
			...OPTIONS,
			files: getPath("invalid.scss"),
			fix: true
		});

		expect(result.errored).toBe(false);
		done();
	});

	it("should not fix errors when `fix` parameter is set to false", async done => {
		const result = await handleLintSass({
			...OPTIONS,
			files: getPath("invalid.scss")
		});

		expect(result.errored).toBe(true);
		done();
	});

});