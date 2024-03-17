import {PlanetsDataState} from "./initialState";
import PlanetsActions from "../actions/planets.actions";
import {PlanetsCollection} from "../../models/PlanetsCollection";
import PlanetsReducer, {PlanetsActionType} from "./planetsReducer";

const planets: PlanetsCollection = {
    1: {id: 1, name: 'Mercury', climate: 'hot', diameter: 4879, population: 0, gravity: '3.7 m/s²'},
    2: {id: 2, name: 'Venus', climate: 'hot', diameter: 12104, population: 0, gravity: '8.87 m/s²'}
};

describe('PlanetsReducer', () => {
    const initialState: PlanetsDataState = {
            planets: {},
            favorites: {},
            ttl: 0
        },
        initialStateWithData: PlanetsDataState = {
            planets,
            favorites: {1: true},
            ttl: 15
        };

    it('should return the initial state', () => {
        expect(PlanetsReducer(initialState, {type: PlanetsActions.UNKNOWN_TEST_ACTION})).toEqual(initialState);
        expect(PlanetsReducer(initialStateWithData, {type: PlanetsActions.UNKNOWN_TEST_ACTION})).toEqual(initialStateWithData);
    });

    it('should handle SET_PLANETS action, even with duplicates', () => {
        const stateBefore = {...initialState}, ttl = 1000, action = {type: PlanetsActions.SET_PLANETS, planets, ttl};

        const expectedState = {
            ...initialState,
            ttl: ttl,
            planets: {
                ...stateBefore.planets,
                ...planets
            }
        };

        expect(PlanetsReducer(stateBefore, action)).toEqual(expectedState);
        expect(PlanetsReducer(stateBefore, action)).toEqual(expectedState);
    });

    it('should add a planet to favorites', () => {
        const stateBefore = {...initialState}, planetId = 1, action = {type: PlanetsActions.ADD_TO_FAVORITES, planetId};

        const expectedState = {
            ...stateBefore,
            favorites: {
                ...stateBefore.favorites,
                [planetId]: true
            }
        };

        expect(PlanetsReducer(stateBefore, action)).toEqual(expectedState);
    });

    it('should not add a planet to favorites twice', () => {
        const stateBefore = {...initialState}, planetId = 1, action = {type: PlanetsActions.ADD_TO_FAVORITES, planetId} as PlanetsActionType;

        const expectedState = {
            ...stateBefore,
            favorites: {
                ...stateBefore.favorites,
                [planetId]: true
            }
        };

        expect(PlanetsReducer(stateBefore, action)).toEqual(expectedState);
        expect(PlanetsReducer(stateBefore, action)).toEqual(expectedState);
    });

    it('should handle REMOVE_FROM_FAVORITES action', () => {
        const stateBefore = {
            ...initialState,
            favorites: {
                1: true,
                2: true
            }
        };

        const planetId = 1,
            action = {type: PlanetsActions.REMOVE_FROM_FAVORITES, planetId} as PlanetsActionType,
            {[planetId]: removedKey, ...restFavorites} = stateBefore.favorites;

        const expectedState = {
            ...stateBefore,
            favorites: restFavorites
        };

        expect(PlanetsReducer(stateBefore, action)).toEqual(expectedState);
    });
});
