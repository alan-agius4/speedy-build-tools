import { ArgumentOptions } from "../../utils";
import { LintHtmlOptions } from "./lint-html.model";

export const ARGS: ArgumentOptions<LintHtmlOptions>[] = [
	{
		key: "config",
		alias: "c",
		description: "Lint rules file path",
		default: ".htmlhintrc"
	},
	{
		key: "files",
		alias: "f",
		description: "Files to be linted - Supports glob patterns",
		default: "./src/**/*.*(html|htm)",
		array: true
	},
	{
		key: "continueOnError",
		description: "Determines whether to exit with a non-zero status code on lint errors",
		default: false
	}
];