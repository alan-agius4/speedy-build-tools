import { Logger } from "./logger";

export class Timer {

	private startTime: number;

	constructor(
		private logger: Logger
	) {
	}

	start() {
		this.startTime = Date.now();
		this.logger.info("Started...");
	}

	finish() {
		const duration = Date.now() - this.startTime;
		const time = duration > 1000 ? `${(duration / 1000).toFixed(2)} s` : `${duration.toFixed(3)} ms`;

		this.logger.info(`Finished in ${time}`);
	}

}