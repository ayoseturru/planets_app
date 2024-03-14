import {PlanetsAppState} from "../state/reducers/initialState";

const _stateKey: string = "__APP_STATE__";

/*
    TS does not support definitions with static methods yet...
    One way to keep the whole thing static would be to replace the _storage object
    directly with an object that implements the localStorage class.
    Otherwise, inverse dependency injection on start creating a new object is always an option.
 */
export default class Storage {
    private static _storage: any = localStorage;

    static saveState(state: PlanetsAppState): void {
        Storage.write(_stateKey, state);
    }

    static getState(): PlanetsAppState | null {
        return Storage.read(_stateKey);
    }

    static read(key: string): any | null {
        const data = this._storage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    static write(key: string, value: any): void {
        this._storage.setItem(key, JSON.stringify(value));
    }
}