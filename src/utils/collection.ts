import * as _ from "lodash";

export function toArray<T>(value: T | T[]): T[] {
	if (!_.isArray(value)) {
		return [value];
	}

	return value;
}