import Mode from "./Mode";

export default class Logger {
    static log(...args: any[]): void {
        if (Mode.isDev() && !Mode.isTest()) console.log(...args);
    }

    static logError(...args: any[]): void {
        console.log('\x1b[31m', ...args);
    }
}