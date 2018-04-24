import { fileSystem, Logger, Timer } from "@speedy/node-core";
import * as _ from "lodash";

import { args } from "../utils";

import { ARGS } from "./copy.args";

export interface CopyOptions {
	paths: string | string[];
	dest: string;
}

const logger = new Logger("Copy");

export async function copy(options: CopyOptions | CopyOptions[]): Promise<void> {
	const timer = new Timer(logger).start();

	try {
		const castedOptions = _.isArray(options) ? options : _.castArray(args.mergeWithOptions(ARGS, options));
		await Promise.all(
			_.flatten(castedOptions.map(x => fileSystem.copyAsync(x.paths, x.dest)))
		);
	} catch (error) {
		logger.error("", error);
		throw error;
	} finally {
		timer.finish();
	}
}