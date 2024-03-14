import PlanetsActions from "../actions/planets.actions";
import {PlanetsCollection} from "../../models/PlanetsCollection";

const setPlanets = (planets: PlanetsCollection, ttl: number) => ({type: PlanetsActions.SET_PLANETS, planets, ttl});

const PlanetsCreator = {setPlanets};

export default PlanetsCreator;