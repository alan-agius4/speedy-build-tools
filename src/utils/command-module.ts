import { Logger } from "@speedy/node-core";
import * as _ from "lodash";
import * as yargs from "yargs";

import { args, ArgumentOptions } from "./args";

const logger = new Logger("Build Command Module");

export interface CommandModuleHandler {
	path: string;
	functionName: string;
}
export interface CommandModule {
	command: string;
	description: string;
	handler: CommandModuleHandler | ((options?: any) => Promise<any>);
	args: ArgumentOptions<any>[];
}

export function buildCommandModule(options: CommandModule): yargs.CommandModule {
	return {
		command: options.command,
		describe: options.description,
		handler: argv => {
			let fn: Promise<any>;

			if (_.isFunction(options.handler)) {
				fn = options.handler(argv);
			} else {
				const { functionName, path } = options.handler;
				fn = require(path)[functionName](argv);
			}

			fn.catch(error => {
				logger.debug(buildCommandModule.name, error);
				logger.debug(buildCommandModule.name, `Command: ${options.command}, Exiting with Exit Code: 1`);
				process.exit(1);
			});
		},
		builder: () => args.set(options.args)
	};
}