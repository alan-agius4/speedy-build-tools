import { Logger } from "@speedy/node-core";

import { initCache } from "../require-cache";
import { WorkerMessage } from "./worker.model";

const logger = new Logger("Worker Process");

process.on("message", async (message: WorkerMessage) => {
	try {
		initCache(true);
		const task = require(message.modulePath)[message.task] as (...params: any[]) => Promise<any>;
		const result = await task.call(null, message.parameters) as Promise<any>;

		sendMessage(message, { resolved: result });
	} catch (error) {
		sendMessage(message, {
			error: {
				message: error.message,
				name: error.name,
				stack: error.stack
			}
		});
		process.exit(1);
	}
});

function sendMessage(message: WorkerMessage, messageOverrides: Partial<WorkerMessage>) {
	logger.debug(sendMessage.name, `task: ${message.task}, pid: ${process.pid}`);
	process.send!({ ...message, ...messageOverrides });
}