import * as _ from "lodash";

export function toArray<T>(pattern: T | T[]): T[] {
	if (!_.isArray(pattern)) {
		return [pattern];
	}

	return pattern;
}