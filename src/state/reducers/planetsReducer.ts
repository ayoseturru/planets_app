import InitialState, {PlanetsDataState} from "./initialState";
import PlanetsActions from "../actions/planets.actions";
import {PlanetsCollection} from "../../models/PlanetsCollection";
import Storage from "../../utils/Storage";

export interface PlanetsActionType {
    type: keyof typeof PlanetsActions;
    planets?: PlanetsCollection;
    planetId?: number;
    ttl?: typeof InitialState.planetsData.ttl;
}

const defaultState: PlanetsDataState = Storage.getState()?.planetsData || InitialState.planetsData;

const PlanetsReducer = (state: PlanetsDataState = defaultState, action: PlanetsActionType): PlanetsDataState => {
    switch (action.type) {
        case PlanetsActions.SET_PLANETS:
            return {
                ...state,
                planets: action.planets!
            };
        default:
            return state;
    }
};

export default PlanetsReducer;
