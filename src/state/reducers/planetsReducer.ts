import InitialState, {PlanetsDataState} from "./initialState";
import PlanetsActions from "../actions/planets.actions";
import {PlanetsCollection} from "../../models/PlanetsCollection";

export interface PlanetsActionType {
    type: keyof typeof PlanetsActions;
    planets?: PlanetsCollection;
    planetId?: number;
    ttl?: typeof InitialState.planetsData.ttl;
}

const PlanetsReducer = (state: PlanetsDataState = InitialState.planetsData, action: PlanetsActionType): PlanetsDataState => {
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
