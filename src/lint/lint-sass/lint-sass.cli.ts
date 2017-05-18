import { buildCommandModule } from "../../utils";
import { ARGS } from "./lint-sass.args";

/** @internal */
export const lintSassModule = buildCommandModule({
	command: "lint-sass",
	description: "Lint Sass files",
	handler: {
		path: __dirname,
		functionName: "lintSass"
	},
	args: ARGS
});