import { ChildProcess } from "child_process";

export interface WorkerProcess {
	task: string;
	process: ChildProcess;
}

export interface WorkerMessage {
	task?: string;
	resolve?: any;
	reject?: any;
	error?: any;
	modulePath?: string;
	parameters?: any;
}