import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import App from '../../../App';
import {PLANETS_TEST_IDS} from "../../planetsTable/PlanetsTable";
import {RouterPaths} from "../Main";

const mockPlanetsData = [
    {
        "name": "Tund",
        "climate": "unknown",
        "diameter": "12190",
        "population": "0",
        "gravity": "unknown",
        "url": "https://swapi.dev/api/planets/41/"
    },
    {
        "name": "Haruun Kal",
        "climate": "temperate",
        "diameter": "10120",
        "population": "705300",
        "gravity": "0.98",
        "url": "https://swapi.dev/api/planets/42/"
    },
    // Add more planets here
    {
        "name": "Planet 3",
        "climate": "unknown",
        "diameter": "12190",
        "population": "0",
        "gravity": "unknown",
        "url": "https://swapi.dev/api/planets/43/"
    },
    {
        "name": "Planet 4",
        "climate": "unknown",
        "diameter": "12190",
        "population": "0",
        "gravity": "unknown",
        "url": "https://swapi.dev/api/planets/44/"
    },
    {
        "name": "Planet 5",
        "climate": "unknown",
        "diameter": "12190",
        "population": "0",
        "gravity": "unknown",
        "url": "https://swapi.dev/api/planets/45/"
    },
    {
        "name": "Planet 6",
        "climate": "unknown",
        "diameter": "12190",
        "population": "0",
        "gravity": "unknown",
        "url": "https://swapi.dev/api/planets/46/"
    },
    {
        "name": "Planet 7",
        "climate": "unknown",
        "diameter": "12190",
        "population": "0",
        "gravity": "unknown",
        "url": "https://swapi.dev/api/planets/47/"
    },
    {
        "name": "Planet 8",
        "climate": "unknown",
        "diameter": "12190",
        "population": "0",
        "gravity": "unknown",
        "url": "https://swapi.dev/api/planets/48/"
    },
    {
        "name": "Planet 9",
        "climate": "unknown",
        "diameter": "12190",
        "population": "0",
        "gravity": "unknown",
        "url": "https://swapi.dev/api/planets/49/"
    },
    {
        "name": "Planet 10",
        "climate": "unknown",
        "diameter": "12190",
        "population": "0",
        "gravity": "unknown",
        "url": "https://swapi.dev/api/planets/50/"
    }
];

describe('PlanetTable component', () => {
    beforeEach(() => {
        const mockFetch = jest.fn(),
            mockFetchResponse = {
                json: async () => ({results: mockPlanetsData, next: null}),
            };

        global.fetch = mockFetch.mockResolvedValue(mockFetchResponse);
    });


    it('renders the correct number of rows', async () => {
        await waitFor(() => render(<App/>));

        const planetTableRows = screen.queryAllByTestId((id) => id.startsWith(PLANETS_TEST_IDS.Planets));
        expect(planetTableRows.length).toBe(10);
    });

    it('navigates to the correct planet page when a row is clicked', async () => {
        await waitFor(() => render(<App/>));

        const planetTableRows = screen.getAllByTestId((id) => id.startsWith('planet-row_')),
            randomIndex = Math.floor(Math.random() * planetTableRows.length),
            randomPlanetRow = planetTableRows[randomIndex];

        const planetUrl = mockPlanetsData[randomIndex].url,
            planetId = planetUrl.split('/').slice(-2)[0];

        fireEvent.click(randomPlanetRow);

        expect(window.location.pathname).toMatch(new RegExp(`${RouterPaths.Planet.replace(":planetId", planetId)}`));
    });
});
