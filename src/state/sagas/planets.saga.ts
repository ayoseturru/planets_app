import {PlanetsAppState} from "../reducers/initialState";
import {call, select, takeEvery} from 'redux-saga/effects';
import Storage from "../../utils/Storage";
import PlanetsActions from "../actions/planets.actions";

function* saveState() {
    const state: PlanetsAppState = yield select();
    yield call(Storage.saveState, state);
}

export function* planetsSaga() {
    yield takeEvery(Object.values(PlanetsActions), saveState);
}
