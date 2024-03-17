import React from 'react';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import App from '../../App';
import {RouterPaths} from "../Main";
import {PLANETS_TEST_IDS} from "../../components/planetsTable/PlanetsTable";

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
    beforeEach(async () => {
        const mockFetch = jest.fn(),
            mockFetchResponse = {
                json: async () => ({results: mockPlanetsData, next: null}),
            };

        global.fetch = mockFetch.mockResolvedValue(mockFetchResponse);
        await waitFor(() => render(<App/>));
    });

    it('renders the correct number of rows', async () => {
        const planetTableRows = screen.queryAllByTestId((id) => id.startsWith(PLANETS_TEST_IDS.Planets));
        expect(planetTableRows.length).toBe(10);
    });

    it('opens the correct planet page in a new tab when a row is clicked', async () => {
        const planetTableRows = screen.getAllByTestId((id) => id.startsWith('planet-row_')),
            randomIndex = Math.floor(Math.random() * planetTableRows.length),
            randomPlanetRow = planetTableRows[randomIndex];

        const planetUrl = mockPlanetsData[randomIndex].url,
            planetId = planetUrl.split('/').slice(-2)[0],
            mockWindowOpen = jest.spyOn(window, 'open').mockReturnValue(null);

        fireEvent.click(randomPlanetRow);
        expect(mockWindowOpen).toHaveBeenCalledWith(`${RouterPaths.Planet.replace(":planetId", planetId)}`, '_blank');
        mockWindowOpen.mockRestore();
    });

    it('navigates to the correct planet page when the URL is typed directly', async () => {
        const randomPlanetData = mockPlanetsData[Math.floor(Math.random() * mockPlanetsData.length)],
            planetId = randomPlanetData.url.split('/').slice(-2)[0],
            planetPageUrl = `${RouterPaths.Planet.replace(":planetId", planetId)}`;

        window.history.pushState({}, 'Test page', planetPageUrl);
        await waitFor(() => render(<App/>));

        expect(screen.getByRole('heading', {name: randomPlanetData.name})).toBeInTheDocument();
    });
});
