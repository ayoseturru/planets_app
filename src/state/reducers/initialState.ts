import Planet from "../../models/Planet";

export interface PlanetsAppState {
    planets: Map<string, Planet>;
    favourites: Map<string, boolean>;
}

const initialState: PlanetsAppState = {
    planets: new Map<string, Planet>(),
    favourites: new Map<string, boolean>()
};

export default initialState;