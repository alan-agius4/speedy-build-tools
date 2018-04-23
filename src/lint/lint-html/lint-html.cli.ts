import { buildCommandModule } from "../../utils";

import { ARGS } from "./lint-html.args";

/** @internal */
export const lintHtmlModule = buildCommandModule({
	command: "lint-html",
	description: "Lint Html files",
	handler: {
		path: __dirname,
		functionName: "lintHtml"
	},
	args: ARGS
});