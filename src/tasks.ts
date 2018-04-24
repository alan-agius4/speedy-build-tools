// tslint:disable:ordered-imports
import { initCache } from "./utils/require-cache";
initCache();

import * as yargs from "yargs";

import { cleanModule } from "./clean/clean.cli";
import { copyModule } from "./copy/copy.cli";
import { lintHtmlModule } from "./lint/lint-html/lint-html.cli";
import { lintSassModule } from "./lint/lint-sass/lint-sass.cli";
import { lintTsModule } from "./lint/lint-ts/lint-ts.cli";
import { args } from "./utils/args";
args.init();

// tslint:disable-next-line:no-unused-expression
yargs
	.command(lintTsModule)
	.command(lintSassModule)
	.command(lintHtmlModule)
	.command(cleanModule)
	.command(copyModule)

	.help()
	.alias("help", "h")

	.version()
	.alias("version", "v")
	.wrap(yargs.terminalWidth() - 1) // - 1 is required to fit in screen
	.argv;