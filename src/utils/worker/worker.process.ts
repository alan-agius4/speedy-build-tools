import { camelCase } from "lodash";

import { Logger } from "../logger";
import { WorkerMessage } from "./worker.model";

const logger = new Logger("Worker Process");

process.on("message", (message: WorkerMessage) => {
	try {
		const task = require(message.modulePath!)[camelCase(message.task)] as Function;

		(task.apply(null, message.parameters) as Promise<{}>)
			.then(
			(x: any) => sendMessage(message, { resolve: x }),
			(x: any) => sendMessage(message, { reject: x })
			)
			.catch((error: Error) => sendMessage(message, { resolve: error }));

	} catch (error) {
		logger.error("onMessage", error);
		sendMessage(message, { resolve: error });
		process.exit(1);
	}
});

function sendMessage(message: WorkerMessage, messageExt: WorkerMessage) {
	logger.debug(`sendMessage, task: ${message.task}, pid: ${process.pid}`);
	process.send!(Object.assign({}, message, messageExt));
}
