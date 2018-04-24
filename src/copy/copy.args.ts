import { ArgumentOptions } from "../utils";

import { CopyOptions } from "./copy";

export const ARGS: ArgumentOptions<CopyOptions>[] = [
	{
		key: "paths",
		alias: "p",
		description: "Paths to be copied - Supports glob patterns",
		array: true
	},
	{
		key: "dest",
		alias: "d",
		description: "Destination of the copied files"
	}
];