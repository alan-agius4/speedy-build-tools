import { command } from "yargs";

import { tsLintCmdModule } from "./lint/lint-ts";

command(tsLintCmdModule)
	.help()
	.argv;