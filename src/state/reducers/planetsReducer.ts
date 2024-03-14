import InitialState, {PlanetsAppState} from "./initialState";
import PlanetsActions from "../actions/planets.actions";

export interface PlanetsActionType {
    type: keyof typeof PlanetsActions;
    planets?: typeof InitialState.planets;
    planetId?: string;
}

const PlanetsReducer = (state: PlanetsAppState = InitialState, action: PlanetsActionType): PlanetsAppState => {
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
