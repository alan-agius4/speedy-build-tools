import { ChildProcess } from "child_process";

export interface WorkerProcess {
	task: string;
	process: ChildProcess;
}

export interface WorkerMessage {
	task: string;
	modulePath: string;
	parameters: any;
	resolved?: any;
	error?: any;
}