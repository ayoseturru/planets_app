import {PlanetsService, PlanetsServiceResponse} from "./PlanetsService";
import Planet from "../models/Planet";
import PlanetsData from "../config/planets.fallback.json";
import {PlanetsCollection} from "../models/PlanetsCollection";

const Errors = {
    Generic: "Something went wrong..."
};

export default class RestPlanetsService implements PlanetsService {
    readonly url: string;
    readonly ttl: number = 24 * 60 * 60 * 1000;

    constructor(url: string) {
        this.url = url;
    }

    async* fetchPlanets(): AsyncGenerator<PlanetsServiceResponse> {
        try {
            let nextUrl = this.url;

            while (nextUrl) {
                const response = await fetch(nextUrl);
                const data = await response.json();

                if (data.results && data.results.length) {
                    yield {ttl: this.ttl, planets: this.parseResponse(data.results)};
                } else {
                    throw Errors.Generic;
                }

                nextUrl = data.next;
            }
        } catch (error) {
            yield {ttl: this.ttl, planets: this.parseResponse(PlanetsData), error: `${error}`};
        }
    }

    private parseResponse(data: any): PlanetsCollection {
        const planetsMap: PlanetsCollection = {};

        data.forEach((planetData: any) => {
            planetsMap[this.getIdFromUrl(planetData.url)] = this.planetDataToPlanet(planetData);
        });

        return planetsMap;
    }

    private planetDataToPlanet(planetData: any): Planet {
        return {
            name: planetData.name,
            climate: planetData.climate,
            diameter: Number(planetData.diameter),
            population: Number(planetData.population)
        };
    }

    private getIdFromUrl(url: string): number {
        const matches = url.match(/\/(\d+)\/$/);
        return matches ? parseInt(matches[1], 10) : -1;
    }
}
