export default class Mode {
    static isDev(): boolean {
        return !this._isHttps();
    }

    static isTest(): boolean {
        return process.env.JEST_WORKER_ID !== undefined;
    }

    private static _isHttps(): boolean {
        return window.location.protocol === "https:";
    }
}