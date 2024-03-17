import InitialState, {PlanetsDataState} from "./initialState";
import PlanetsActions from "../actions/planets.actions";
import {PlanetsCollection} from "../../models/PlanetsCollection";
import Storage from "../../utils/Storage";
import Time from "../../utils/Time";

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
                ttl: action.ttl! + Time.getTimeInMs(),
                planets: {
                    ...state.planets,
                    ...action.planets
                }
            };
        case PlanetsActions.ADD_TO_FAVORITES:
            return {
                ...state,
                favorites: {
                    ...state.favorites,
                    [action.planetId!]: true
                }
            };
        case PlanetsActions.REMOVE_FROM_FAVORITES:
            const {[action.planetId!]: removedKey, ...restFavorites} = state.favorites;

            return {
                ...state,
                favorites: restFavorites
            };
        default:
            return state;
    }
};

export default PlanetsReducer;
