import * as _ from "lodash";
import * as rimraf from "rimraf";

import {
	Logger,
	Timer,
	Args,
	globArray,
	buildCommandModule
} from "../utils";

import { ARGS } from "./clean.args";

export interface CleanOptions {
	paths: string | string[];
}

const logger = new Logger("Clean");

export async function clean(options: CleanOptions): Promise<boolean> {
	const timer = new Timer(logger);

	try {
		timer.start();
		const mergedOptions = Args.mergeWithOptions(ARGS, options);
		const paths = mergedOptions.paths;

		if (_.isString(paths)) {
			rimraf.sync(paths);
		} else if (paths.length === 1) {
			rimraf.sync(_.head(paths));
		} else {
			await Promise.all(
				globArray(paths).map(x => rimraf.sync(x))
			);
		}

		return true;
	} catch (error) {
		logger.error("", error);
		throw error;
	} finally {
		timer.finish();
	}
}

/** @internal */
export const cleanModule = buildCommandModule({
	command: "clean",
	description: "Delete files and directories",
	handler: clean,
	args: ARGS
});