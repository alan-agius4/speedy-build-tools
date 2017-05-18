import { buildCommandModule } from "../../utils";
import { ARGS } from "./lint-ts.args";

/** @internal */
export const lintTsModule = buildCommandModule({
	command: "lint-ts",
	description: "Lint TypeScript files",
	handler: {
		path: __dirname,
		functionName: "lintTs"
	},
	args: ARGS
});