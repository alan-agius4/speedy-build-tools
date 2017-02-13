#!/usr/bin/env node

process.title = "speedy-build-tools";

function __export(m) {
	for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("../dist/tasks"));
