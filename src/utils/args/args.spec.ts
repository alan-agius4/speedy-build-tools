import * as _ from "lodash";
import * as yargs from "yargs";

import { Args } from "./args";

describe("argsSpec", () => {

	describe("mergedConfigArgsAndProcessArgv", () => {
		const processArgs = process.argv;
		const npmConfigArgv = process.env.npm_config_argv;

		beforeAll(() => {
			process.env.npm_config_argv = JSON.stringify({
				cooked: [
					"run",
					"clean",
					"--config",
					"config.txt",
					"--files",
					"file-1.txt",
					"file-2.txt"
				]
			});

			process.argv = [
				"C:\\Program Files\\nodejs\\node.exe",
				"C:\\git\\node_modules\tasks.js",
				"clean",
				"--config",
				"config-override.txt",
				"--debug",
				"help"
			];
		});

		afterAll(() => {
			process.argv = processArgs;
			process.env.npm_config_argv = npmConfigArgv;
		});

		it("should merge and override process.env.npm_config_argv with process.args values", () => {
			yargs.parse(Args.mergedConfigArgsAndProcessArgv());

			expect(yargs.argv.config).toBe("config.txt");
			expect(yargs.argv.debug).toBe(true);
		});

		it("should return 'files' argument as array", () => {
			yargs.parse(Args.mergedConfigArgsAndProcessArgv());
			yargs.array("files");

			expect(yargs.argv.files).toEqual([
				"file-1.txt",
				"file-2.txt"
			]);
		});
	});


	describe("parse", () => {
		const ARGS = ["--debug", "--config", "config-1.txt", "config-2.txt", "--help", "false"];

		it("should parse 'Args' and convert them to a dictionary", () => {
			const parsedArgs = Args.parse(ARGS);
			expect(_.get(parsedArgs, "help")).toBe(false);
			expect(_.get(parsedArgs, "debug")).toBe(true);
			expect(_.get(parsedArgs, "config")).toEqual(["config-1.txt", "config-2.txt"]);
		});
	});

});