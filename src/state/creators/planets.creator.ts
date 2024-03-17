import PlanetsActions from "../actions/planets.actions";
import {PlanetsCollection} from "../../models/PlanetsCollection";

const setPlanets = (planets: PlanetsCollection, ttl: number) => ({type: PlanetsActions.SET_PLANETS, planets, ttl}),
    addToFavorites = (planetId: number) => ({type: PlanetsActions.ADD_TO_FAVORITES, planetId}),
    removeFromFavorites = (planetId: number) => ({type: PlanetsActions.REMOVE_FROM_FAVORITES, planetId});

const PlanetsCreator = {setPlanets, addToFavorites, removeFromFavorites};

export default PlanetsCreator;