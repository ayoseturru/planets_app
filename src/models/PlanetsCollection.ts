import Planet from "./Planet";

export type PlanetsCollection = Record<number, Planet>;

export type PlanetsCollectionSortField = 'population' | 'diameter';

export type PlanetsCollectionSort = {
    field: PlanetsCollectionSortField;
    ascending: boolean;
};

const sortPlanetsCollection = (planets: PlanetsCollection, field: PlanetsCollectionSortField, ascending: boolean = true): Planet[] => {
    return Object.values(planets).sort((a, b) => {
        const valueA = a[field] === -1 ? (ascending ? Number.POSITIVE_INFINITY : -1) : a[field];
        const valueB = b[field] === -1 ? (ascending ? Number.POSITIVE_INFINITY : -1) : b[field];

        if (valueA !== valueB) {
            return ascending ? valueA - valueB : valueB - valueA;
        } else {
            return a.name.localeCompare(b.name);
        }
    });
};

export {sortPlanetsCollection}