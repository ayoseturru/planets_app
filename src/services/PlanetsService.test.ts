import RestPlanetsService from './RestPlanetsService';
import {PlanetsServiceResponse} from './PlanetsService';
import {PlanetsCollection} from '../models/PlanetsCollection';
import FallbackPlanets from '../config/planets.fallback.json';

describe('RestPlanetsService', () => {
    it('should handle errors during data fetching and provide a fallback', async () => {
        global.fetch = jest.fn().mockRejectedValue(new Error('Network Error'));

        const serviceWithError = new RestPlanetsService('https://example.com/api/whatever'),
            fallbackRelatedPlanets: PlanetsCollection = FallbackPlanets,
            generator = serviceWithError.fetchPlanets(),
            result = await generator.next();

        expect(result.value).toEqual({
            ttl: 24 * 60 * 60 * 1000,
            planets: fallbackRelatedPlanets,
            error: 'Error: Network Error'
        } as PlanetsServiceResponse);
    });

    it('should fetch planets data successfully', async () => {
        const mockPlanetsData = [
            {
                "name": "Tund",
                "rotation_period": "48",
                "orbital_period": "1770",
                "diameter": "12190",
                "climate": "unknown",
                "gravity": "unknown",
                "terrain": "barren, ash",
                "surface_water": "unknown",
                "population": "0",
                "residents": [
                    "https://swapi.dev/api/people/50/"
                ],
                "films": [],
                "created": "2014-12-20T10:07:29.578000Z",
                "edited": "2014-12-20T20:58:18.489000Z",
                "url": "https://swapi.dev/api/planets/41/"
            },
            {
                "name": "Haruun Kal",
                "rotation_period": "25",
                "orbital_period": "383",
                "diameter": "10120",
                "climate": "temperate",
                "gravity": "0.98",
                "terrain": "toxic cloudsea, plateaus, volcanoes",
                "surface_water": "unknown",
                "population": "705300",
                "residents": [
                    "https://swapi.dev/api/people/51/"
                ],
                "films": [],
                "created": "2014-12-20T10:12:28.980000Z",
                "edited": "2014-12-20T20:58:18.491000Z",
                "url": "https://swapi.dev/api/planets/42/"
            }
        ];

        const mockFetch = jest.fn(),
            mockFetchResponse = {
                json: async () => ({results: mockPlanetsData, next: null}),
            };

        global.fetch = mockFetch.mockResolvedValue(mockFetchResponse);

        const service = new RestPlanetsService('https://example.com/api/planets'),
            generator = service.fetchPlanets(),
            result = await generator.next();

        expect(result.value).toEqual({
            ttl: 24 * 60 * 60 * 1000,
            planets: expect.objectContaining({
                '41': expect.any(Object),
                '42': expect.any(Object)
            }),
        } as PlanetsServiceResponse);
    });
});
