import { buildCommandModule } from "../utils";

import { ARGS } from "./copy.args";

/** @internal */
export const copyModule = buildCommandModule({
	command: "copy",
	description: "Copy files and directories",
	handler: {
		path: __dirname,
		functionName: "copy"
	},
	args: ARGS
});