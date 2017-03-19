import { ArgumentOptions } from "../utils";
import { CleanOptions } from "./clean";

export const ARGS: ArgumentOptions<CleanOptions>[] = [
	{
		key: "paths",
		alias: "p",
		description: "Paths to be deleted - Supports glob patterns",
		array: true
	}
];