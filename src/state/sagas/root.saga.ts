import {all} from 'redux-saga/effects';
import {planetsSaga} from "./planets.saga";

export function* rootSaga() {
    yield all([
        planetsSaga()
    ]);
}