import {PlanetsCollection, sortPlanetsCollection} from "./PlanetsCollection";

describe('sortPlanetsCollection', () => {
    const planets: PlanetsCollection = {
        1: {id: 1, name: 'Mercury', climate: 'hot', diameter: 4879, population: 0, gravity: '3.7 m/s²'},
        2: {id: 2, name: 'Venus', climate: 'hot', diameter: 12104, population: 0, gravity: '8.87 m/s²'},
        3: {id: 3, name: 'Earth', climate: 'temperate', diameter: 12742, population: 7693165599, gravity: '9.81 m/s²'}
    };

    it('should sort planets by population in ascending order', () => {
        const sortedPlanets = sortPlanetsCollection(planets, 'population'),
            populations = sortedPlanets.map(planet => planet.population);

        expect(populations).toEqual([0, 0, 7693165599]);
    });

    it('should sort planets by diameter in descending order', () => {
        const sortedPlanets = sortPlanetsCollection(planets, 'diameter', false),
            diameters = sortedPlanets.map(planet => planet.diameter);

        expect(diameters).toEqual([12742, 12104, 4879]);
    });

    it('should handle -1 values in population by treating them as positive infinity in ascending order', () => {
        const modifiedPlanets = {
                ...planets,
                4: {id: 4, name: 'Mars', climate: 'cold', diameter: 6779, population: -1, gravity: '3.7 m/s²'},
            },
            sortedPlanets = sortPlanetsCollection(modifiedPlanets, 'population'),
            populations = sortedPlanets.map(planet => planet.population);

        expect(populations).toEqual([0, 0, 7693165599, -1]);
    });

    it('should handle -1 values in diameter by treating them as positive infinity in descending order', () => {
        const modifiedPlanets = {
                ...planets,
                4: {id: 4, name: 'Mars', climate: 'cold', diameter: -1, population: 0, gravity: '3.7 m/s²'},
            },
            sortedPlanets = sortPlanetsCollection(modifiedPlanets, 'diameter', false),
            diameters = sortedPlanets.map(planet => planet.diameter);

        expect(diameters).toEqual([12742, 12104, 4879, -1]);
    });
});
