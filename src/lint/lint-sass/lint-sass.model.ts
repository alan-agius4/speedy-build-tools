import { FormatterType } from "stylelint";

export interface LintSassOptions {
	files: string | string[];
	config: string;
	formatter: FormatterType;
	continueOnError: boolean;
	fix: boolean;
}

export const LINT_SASS_FORMATTERS = {
	json: "json" as FormatterType,
	string: "string" as FormatterType,
	verbose: "verbose" as FormatterType
};