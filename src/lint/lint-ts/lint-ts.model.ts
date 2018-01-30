export interface LintTsOptions {
	files: string | string[];
	config: string;
	formatter: LintTsFormatters;
	continueOnError: boolean;
	fix: boolean;
	program: string;
}

export interface LintTsResult {
	failureCount: number;
	fixesCount: number;
	errorCount: number;
}

export type LintTsFormatters = "vso"
	| "verbose"
	| "prose"
	| "stylish"
	| "pmd"
	| "json"
	| "msbuild"
	| "fileList"
	| "codeFrame"
	| "checkstyle";

export const LINT_TS_FORMATTERS = {
	vso: "vso" as LintTsFormatters,
	verbose: "verbose" as LintTsFormatters,
	prose: "prose" as LintTsFormatters,
	stylish: "stylish" as LintTsFormatters,
	pmd: "pmd" as LintTsFormatters,
	json: "json" as LintTsFormatters,
	msbuild: "msbuild" as LintTsFormatters,
	fileList: "fileList" as LintTsFormatters,
	codeFrame: "codeFrame" as LintTsFormatters,
	checkstyle: "checkstyle" as LintTsFormatters
};