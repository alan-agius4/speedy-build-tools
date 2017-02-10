#!/usr/bin/env node

var _ = require("lodash");
process.title = "speedy-build-tools";

if (process.argv.length <= 2) {
	console.error(`Missing ${process.title} task name`);
	process.exit(1);
}

if (process.env.npm_config_argv) {
	var npmRunArgs = JSON.parse(process.env.npm_config_argv);
	if (npmRunArgs && npmRunArgs.original && npmRunArgs.original.length > 2) {
		// add flags from original "npm run" command
		for (var i = 2; i < npmRunArgs.original.length; i++) {
			process.argv.push(npmRunArgs.original[i]);
		}
	}
}

var task = process.argv[2];

require("../dist")[_.camelCase(task)]()
	.catch(error => {
		console.error(task, error);
		process.exit(1);
	});
