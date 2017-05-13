import * as yargs from "yargs";

import { ArgumentOptions } from "./args/args.model";
import { args } from "./args/args";

export interface CommandModule {
	command: string;
	description: string;
	handler: (options?: any) => Promise<any>;
	args: ArgumentOptions<any>[];
}

export function buildCommandModule(options: CommandModule): yargs.CommandModule {
	return {
		command: options.command,
		describe: options.description,
		handler: args => options.handler(args).catch(() => process.exit(1)),
		builder: () => args.set(options.args)
	};
}