import { cyan, red, yellow, green, gray, white } from "colors";
import { padStart } from "lodash";

const padTimeUnit = (unit: number) => padStart(unit.toString(), 2, "0");
export class Logger {

	constructor(
		private scope?: string
	) {
	}

	info(message: string) {
		console.log(white(this.formatMessage(message)));
	}

	debug(message: string) {
		// todo: this should be printed only when env is debug mode.
		console.log(green(this.formatMessage(message)));
	}

	warn(message: string) {
		console.log(yellow(this.formatMessage(message)));
	}

	error(message: string | null, error?: Error) {
		console.error(red(this.formatMessage(this.formatErrorMessage(message, error))));
	}

	private formatMessage(message: string): string {
		const date = new Date();
		const time = gray(`${padTimeUnit(date.getHours())}:${padTimeUnit(date.getMinutes())}:${padTimeUnit(date.getSeconds())}`);

		return `${white(`[${time}]`)} ${cyan(`${this.scope}:`)} ${message}`;
	}

	private formatErrorMessage(message: string | null, error?: Error): string {
		if (error) {
			const errorMsg = error.message ? error.message : JSON.stringify(error);
			return `Error: ${message ? `${message}, ${errorMsg}` : errorMsg}`;
		}

		return `Error: ${message}`;
	}
}