import * as _ from "lodash";

import { ArgumentOptions } from "../../utils";

import { LINT_TS_FORMATTERS, LintTsOptions } from "./lint-ts.model";

export const ARGS: ArgumentOptions<LintTsOptions>[] = [
	{
		key: "program",
		alias: "p",
		description: "tsconfig path",
		default: "./tsconfig.json"
	},
	{
		key: "config",
		alias: "c",
		description: "Lint rules file path",
		default: "tslint.json"
	},
	{
		key: "files",
		alias: "f",
		description: "Files to be linted - Supports glob patterns",
		default: "src/**/*.ts",
		array: true
	},
	{
		key: "formatter",
		description: "Formatter to use to format the linter results",
		default: LINT_TS_FORMATTERS.stylish,
		choices: _.keysIn(LINT_TS_FORMATTERS)
	},
	{
		key: "fix",
		description: "Determines whether to auto fix lint issues (which support fixing)",
		default: false
	},
	{
		key: "continueOnError",
		description: "Determines whether to exit with a non-zero status code on lint errors",
		default: false
	}
];