import { command } from "yargs";
import { tsLintModule } from "./lint/lint-ts";

command(tsLintModule)
	.help()
	.argv;