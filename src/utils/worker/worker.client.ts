import { fork, ChildProcess } from "child_process";
import { join } from "path";
import { findIndex } from "lodash";
import { Logger } from "@speedy/node-core";

import "./worker.process";
import { WorkerProcess, WorkerMessage } from "./worker.model";

const logger = new Logger("Worker Client");

export namespace Worker {
	const workers: WorkerProcess[] = [];

	export function run<T>(modulePath: string, task: string, parameters?: any): Promise<T> {
		return new Promise((resolve, reject) => {
			const worker = create(task);

			if (!worker) {
				return;
			}

			worker
				.on("message", (message: WorkerMessage) => {
					if (message.error) {
						reject(message.error);
					} else {
						resolve(message.resolved);
					}

					kill(worker.pid);
				})
				.on("error", error => logger.error(`task: ${task}, pid: ${worker.pid}`, error))
				.on("exit", code => {
					logger.debug(run.name, `Exit task: ${task}, pid: ${worker.pid}, exitCode: ${code}`);

					if (code > 0) {
						process.exit(1);
					}
				})
				.send({
					task,
					modulePath,
					parameters
				} as WorkerMessage);
		});
	}

	function create(task: string): ChildProcess {
		try {
			const childProcess = fork(join(__dirname, "worker.process.js"), process.argv);

			workers.push({
				task,
				process: childProcess
			});

			logger.debug(create.name, `task: ${task}, pid: ${childProcess.pid}`);

			return childProcess;
		} catch (error) {
			logger.error(`Unable to 'create' worker task: ${task}`, error);
			throw error;
		}
	}

	function kill(pid: number) {
		const workerIndex = findIndex(workers, x => pid === (x && x.process.pid));

		if (workerIndex < 0) {
			return;
		}

		const worker = workers[workerIndex];

		try {
			worker.process.kill("SIGTERM");
			logger.debug(kill.name, `task: ${worker.task}, pid: ${pid}`);
		} catch (error) {
			logger.error(`Unable to 'kill' worker task: ${worker.task}, pid: ${pid}`, error);
		} finally {
			delete workers[workerIndex];
		}
	}
}
