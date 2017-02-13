import { isNil } from "lodash";
import {
	argv,
	boolean,
	choices,
	number,
	array,
	command,
	alias as argvAlias,
	default as argvDefault
} from "yargs";

import { Arguments } from "./args.model";

export namespace Args {

	setBoolean("debug", false);
	setBoolean("prod", false, "rel");

	export function setArray<T>(key: string, values: Array<T>, defaultValue?: T, alias?: string) {
		set<T>(key, defaultValue, alias);

		if (values) {
			choices(key, values);
		}

		array(key);
	}

	export function setBoolean(key: string, defaultValue?: boolean, alias?: string) {
		set<boolean>(key, defaultValue, alias);
		boolean(key);
	}

	export function setNumber(key: string, defaultValue?: number, alias?: string) {
		set<number>(key, defaultValue, alias);
		number(key);
	}

	export function set<T>(key: string, defaultValue?: T, alias?: string) {
		if (alias) {
			argvAlias(key, alias);
		}

		if (!isNil(defaultValue)) {
			argvDefault(key, defaultValue);
		}
	}

	export const getAll = <T extends Arguments>() => argv as T;
	export const env = Args.getAll();
}