import * as yargs from "yargs";

export interface Arguments {
	debug: boolean;
}

export interface ArgumentOptions<T> extends yargs.Options {
	key: keyof T;
}