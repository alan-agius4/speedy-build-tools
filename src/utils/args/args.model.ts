import * as yargs from "yargs";

export interface Arguments extends yargs.Arguments {
	debug: boolean;
}

export interface ArgumentOptions<T> extends yargs.Options {
	key: keyof T;
}