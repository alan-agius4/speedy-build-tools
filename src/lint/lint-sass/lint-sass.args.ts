import * as _ from "lodash";

import { ArgumentOptions } from "../../utils";
import { LintSassOptions, LINT_SASS_FORMATTERS } from "./lint-sass.model";

export const ARGS: ArgumentOptions<LintSassOptions>[] = [
	{
		key: "config",
		alias: "c",
		description: "Lint rules file path",
		default: ".stylelintrc"
	},
	{
		key: "files",
		alias: "f",
		description: "Files to be linted - Supports glob patterns",
		default: "./src/**/*.*(scss|sass)",
		array: true
	},
	{
		key: "formatter",
		description: "Formatter to use to format the linter results",
		default: LINT_SASS_FORMATTERS.verbose,
		choices: _.keysIn(LINT_SASS_FORMATTERS)
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