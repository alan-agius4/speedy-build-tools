export interface LintSassOptions {
	files: string | string[];
	config: string;
	formatter: LintSassFormatters;
	continueOnError: boolean;
	fix: boolean;
}

export type LintSassFormatters = "json" | "string" | "verbose";

export const LINT_SASS_FORMATTERS = {
	json: "json" as LintSassFormatters,
	string: "string" as LintSassFormatters,
	verbose: "verbose" as LintSassFormatters
};