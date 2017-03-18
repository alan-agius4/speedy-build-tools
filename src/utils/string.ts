import * as _ from "lodash";

const BOOLEAN_VALUES = ["true", "false"];

/**
 * Casts a value of type string to it's primitive type.
 *
 * @export
 * @param {string} value
 * @returns {(boolean | number | string)}
 */
export function toPrimitive(value: string): boolean | number | string {
	if (BOOLEAN_VALUES.indexOf(value) > -1) {
		return value === "true";
	}

	const numberValue = _.toNumber(value);
	return _.isNaN(numberValue) ? value : numberValue;
}