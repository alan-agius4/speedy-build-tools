import * as yargs from "yargs";

import { ArgumentOptions } from "./args/args.model";
import { Args } from "./args/args";

export interface CommandModule {
	command: string;
	description: string;
	handler: () => Promise<any>;
	args: ArgumentOptions<any>[];
}

export function buildCommandModule(options: CommandModule): yargs.CommandModule {
	return {
		command: options.command,
		describe: options.description,
		handler: () => options.handler().catch(() => process.exit(1)),
		builder: () => Args.set(options.args)
	};
}