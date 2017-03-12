import * as yargs from "yargs";

import { cleanModule } from "./clean/clean";
import { lintSassModule, lintTsModule } from "./lint";

yargs
	.command(lintSassModule)
	.command(lintTsModule)

	.command(cleanModule)

	.help()
	.alias("help", "h")
 	.demandCommand(1, "You need at least one command before moving on")
	.version()
	.alias("version", "v")
	.wrap(yargs.terminalWidth() - 1) // - 1 is required to fit in screen
	.argv;