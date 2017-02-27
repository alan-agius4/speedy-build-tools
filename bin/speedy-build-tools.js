#!/usr/bin/env node

function __export(m) {
	for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

process.title = "speedy-build-tools";
__export(require("../dist/tasks"));
