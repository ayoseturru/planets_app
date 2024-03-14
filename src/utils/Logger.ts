import Mode from "./Mode";

export default class Logger {
    static log(...args: any[]): void {
        if (Mode.isDev() && !Mode.isTest()) console.log(...args);
    }
}