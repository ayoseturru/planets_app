import {PlanetsCollection} from "../models/PlanetsCollection";

export type PlanetsServiceResponse = {
    ttl: number;
    planets: PlanetsCollection;
    error?: string;
};

export interface PlanetsService {
    url: string;

    fetchPlanets(): AsyncGenerator<PlanetsServiceResponse>;
}