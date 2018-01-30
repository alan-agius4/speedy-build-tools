import { packageMeta } from "@speedy/node-core";
import { RequireCache } from "@speedy/require-cache";
import { join } from "path";

export function initCache(readOnlyMode = false) {
	new RequireCache({
		readOnlyMode,
		cacheFilePath: join(__dirname, "../../.cache/require-cache.json"),
		cacheKiller: packageMeta.getVersion(join(__dirname, "../../package.json"))
	}).start();
}