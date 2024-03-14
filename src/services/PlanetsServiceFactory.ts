import RestPlanetsService from "./RestPlanetsService";
import {PlanetsService} from "./PlanetsService";

export default class PlanetsServiceFactory {
    private static instance: PlanetsService | null = null;

    static getService(serviceType: string, url: string): PlanetsService {
        if (!PlanetsServiceFactory.instance) {
            if (serviceType === typeof RestPlanetsService) {
                PlanetsServiceFactory.instance = new RestPlanetsService(url);
            } else {
                throw new Error("Unsupported service type");
            }
        }

        return PlanetsServiceFactory.instance;
    }
}