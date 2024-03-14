import {combineReducers} from 'redux';
import PlanetsReducer from "./planetsReducer";

const rootReducer = combineReducers({
    planetsData: PlanetsReducer
});

export default rootReducer;
