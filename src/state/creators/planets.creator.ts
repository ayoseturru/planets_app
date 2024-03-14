import InitialState from "../reducers/initialState";
import PlanetsActions from "../actions/planets.actions";

const setPlanets = (planets: typeof InitialState.planets) => ({type: PlanetsActions.SET_PLANETS, planets});

const PlanetsCreator = {setPlanets};

export default PlanetsCreator;