import * as _ from "lodash";

import {
	deleteAsync,
	Logger,
	Timer,
	Args,
	glob,
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
		const { paths } = Args.mergeWithOptions(ARGS, options);

		if (_.isEmpty(paths)) {
			throw new Error("Paths is missing");
		}

		await Promise.all(glob(paths).map(deleteAsync));

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
	command: "clean [paths..]",
	description: "Delete files and directories",
	handler: clean,
	args: ARGS
});