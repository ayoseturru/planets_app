import {combineReducers} from 'redux';
import PlanetsReducer from "./planetsReducer";

const rootReducer = combineReducers({
    planets: PlanetsReducer
});

export default rootReducer;
