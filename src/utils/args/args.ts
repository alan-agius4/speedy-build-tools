import * as  _ from "lodash";
import * as yargs from "yargs";

import { Dictionary } from "../dictionary";
import { toPrimitive } from "../string";
import { Arguments, ArgumentOptions } from "./args.model";

export namespace Args {

	const ARGS_REGEXP = /^(-+)([\w\-]*)(=?)([\w\-\s]*)$/;

	yargs.parse(mergedConfigArgsAndProcessArgv());

	set<Arguments>([{
		key: "debug",
		description: "Show debug information",
		boolean: true
	}]);

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
	 * Merges `process.env.npm_config_argv` with `process.argv` and remove duplicate arguments
	 *
	 * @export
	 * @returns {string[]}
	 */
	export function mergedConfigArgsAndProcessArgv(): string[] {
		if (!process.env.npm_config_argv) {
			return process.argv.slice(2);
		}

		const parsedArgv = parse(process.argv);
		const parsedConfigArgv = parse(JSON.parse(process.env.npm_config_argv).cooked);
		const mergedArgv = { ...parsedArgv, ...parsedConfigArgv };
		const tranformedArgs = _.flatten(_.get<string[]>(parsedArgv, "_"));

		_.forEach(mergedArgv, (value, key) => {
			if (key === "_") {
				return;
			}

			const tranformedKey = `--${key}`;

			if (_.isArray(value)) {
				tranformedArgs.push(tranformedKey, ..._.flatten(value).map(_.toString));
				return;
			}

			tranformedArgs.push(tranformedKey, _.toString(value));
		});

		return tranformedArgs;
	}

	/**
	 * Parse Argv and tranform them to a Dictionary
	 *
	 * @export
	 * @param {string[]} argv
	 * @returns {Dictionary<any>}
	 */
	export function parse(argv: string[]): Dictionary<any> {
		const parsedArgv: Dictionary<any> = {
			_: []
		};

		let previousKey = "_";
		let i = _.startsWith(argv[0], "-") ? 0 : 2;

		for (i; i < argv.length; i++) {
			const keyOrValue = argv[i];
			const castedValue = toPrimitive(keyOrValue);

			if (_.startsWith(keyOrValue, "-") && !_.isNumber(castedValue)) {
				const stringPartial = ARGS_REGEXP.exec(keyOrValue)!;

				previousKey = stringPartial[2];
				// by default set the value to true, since argv with no value are truthy
				const value = stringPartial[4];
				parsedArgv[previousKey] = value ? toPrimitive(value) : true;
				continue;
			}

			const currentValue = parsedArgv[previousKey];

			if (_.isBoolean(currentValue)) {
				// we have a value for the parameter, so we override it.
				parsedArgv[previousKey] = castedValue;
			} else if (_.isArray(currentValue)) {
				parsedArgv[previousKey] = [...currentValue, castedValue];
			} else {
				parsedArgv[previousKey] = [currentValue, castedValue];
			}
		}

		return parsedArgv;
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
