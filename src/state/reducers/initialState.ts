import {PlanetsCollection} from "../../models/PlanetsCollection";
import FavoritesCollection from "../../models/FavoritesCollection";

export type PlanetsDataState = {
    planets: PlanetsCollection;
    favorites: FavoritesCollection;
    ttl: number;
};

export interface PlanetsAppState {
    planetsData: PlanetsDataState;
}

const initialState: PlanetsAppState = {
    planetsData: {
        planets: {},
        ttl: 0,
        favorites: {}
    }
};

export default initialState;