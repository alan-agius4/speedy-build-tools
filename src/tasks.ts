import * as yargs from "yargs";

import { lintSassModule, lintTsModule } from "./lint";

yargs
	.command(lintSassModule)
	.command(lintTsModule)

	.help()
	.alias("help", "h")

	.version()
	.alias("version", "v")
	.wrap(yargs.terminalWidth() - 1) // - 1 is required to fit in screen
	.argv;