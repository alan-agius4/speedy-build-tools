import { LintResult } from "htmlhint";

export interface HtmlLintResult {
	result: LintResult[];
	filePath: string;
}

export interface LintHtmlOptions {
	files: string | string[];
	config: string;
	continueOnError: boolean;
}