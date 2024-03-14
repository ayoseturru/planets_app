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

    async fetchPlanets(): Promise<PlanetsServiceResponse> {
        try {
            let allPlanets = [], nextUrl = this.url;

            while (nextUrl) {
                const response = await fetch(nextUrl), data = await response.json();
                allPlanets.push(...data.results);
                nextUrl = data.next;
            }

            if (allPlanets.length) {
                return {ttl: this.ttl, planets: RestPlanetsService.parseResponse(allPlanets)};
            } else {
                throw Errors.Generic;
            }
        } catch (error) {
            return {ttl: this.ttl, planets: RestPlanetsService.parseResponse(PlanetsData), error: `${error}`};
        }
    }

    private static planetDataToPlanet(planetData: any): Planet {
        return {
            name: planetData.name,
            climate: planetData.climate,
            diameter: Number(planetData.diameter),
            population: Number(planetData.population)
        };
    }

    private static getIdFromUrl(url: string): number {
        const matches = url.match(/\/(\d+)\/$/);
        return matches ? parseInt(matches[1], 10) : -1;
    }

    private static parseResponse(data: any): PlanetsCollection {
        const planetsMap: PlanetsCollection = {};

        data.forEach((planetData: any) => {
            planetsMap[RestPlanetsService.getIdFromUrl(planetData.url)] = RestPlanetsService.planetDataToPlanet(planetData);
        });

        return planetsMap;
    }
}
