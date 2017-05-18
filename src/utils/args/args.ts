import * as  _ from "lodash";
import { args as coreArgs } from "@speedy/node-core";
import * as yargs from "yargs";

import { Arguments, ArgumentOptions } from "./args.model";

export namespace args {

	export function init() {
		yargs.parse(coreArgs.mergedConfigArgsAndProcessArgv());
		set<Arguments>([{
			key: "debug",
			description: "Show debug information",
			boolean: true
		}]);
	}

	/**
	 * Register command arguments. When `default` value is specified the argument `type` will be inferred.
	 * @export
	 * @template T
	 * @param {ArgumentOptions<T>[]} args
	 * @returns {T}
	 */
	export function set<T>(args: ArgumentOptions<T>[]): T {
		for (const x of args) {
			yargs.option(x.key, x);

			if (_.isNil(x.default) || x.boolean || x.type || x.number || x.array || x.string) {
				continue;
			}

			if (_.isNumber(x.default)) {
				yargs.number(x.key);
			}

			if (_.isBoolean(x.default)) {
				yargs.boolean(x.key);
			}

			if (_.isString(x.default)) {
				yargs.string(x.key);
			}

			if (_.isArray(x.default)) {
				yargs.array(x.key);
			}
		}

		return yargs.argv;
	}

	/**
	 * Merges `Arguments` default values with `Options`
	 *
	 * @export
	 * @returns {string[]}
	 */
	export function mergeWithOptions<T>(defaultArgs: ArgumentOptions<T>[], options?: Partial<T>): T {
		const defaultOptions = {} as T;

		for (const arg of defaultArgs) {
			if (_.isNil(arg.default)) {
				continue;
			}

			_.set(defaultOptions, arg.key, arg.default);
		}

		// todo: add generic type when issue is solved
		// https://github.com/Microsoft/TypeScript/issues/10727
		return Object.assign({}, defaultOptions, options);
	}

	export const getAll = <T extends Arguments>() => yargs.argv as T;
	export const env = getAll();

}
