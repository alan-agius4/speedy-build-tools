import * as _ from "lodash";
import { fileSystem, Logger, Timer } from "@speedy/node-core";

import { args } from "../utils";
import { ARGS } from "./clean.args";

export interface CleanOptions {
	paths: string | string[];
}

const logger = new Logger("Clean");

export async function clean(options: CleanOptions): Promise<void> {
	const timer = new Timer(logger);

	try {
		timer.start();
		const { paths } = args.mergeWithOptions(ARGS, options);

		if (_.isEmpty(paths)) {
			throw new Error("Paths is missing");
		}

		await Promise.all(fileSystem.glob(paths).map(fileSystem.deleteAsync));
	} catch (error) {
		logger.error("", error);
		throw error;
	} finally {
		timer.finish();
	}
}