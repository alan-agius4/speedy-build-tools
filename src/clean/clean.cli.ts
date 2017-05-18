import { buildCommandModule } from "../utils";
import { ARGS } from "./clean.args";

/** @internal */
export const cleanModule = buildCommandModule({
	command: "clean [paths...]",
	description: "Delete files and directories",
	handler: {
		path: __dirname,
		functionName: "clean"
	},
	args: ARGS
});