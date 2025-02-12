// Note: TOTAL can be dynamically extracted from each request but 
// since this API has static data (Start wars movies are not going to change soon)
// and to avoid unnecessary complexity a decision has been taken to hardcode these values

export type EntityName = 'films' | 'planets' | 'people' | 'starships' | 'vehicles' | 'species' | 'pilots';

interface Entity {
    KEY: string,
    NAME: EntityName;
    FETCH_NAME: EntityName;
    TOTAL: number;
}

export const ENTITIES: Record<string, Entity> = {
    FILMS: {
        KEY: "filmsKey",
        NAME: "films",
        FETCH_NAME: "films",
        TOTAL: 6,
    },
    PEOPLE: {
        KEY: "peoplesKey",
        NAME: "people",
        FETCH_NAME: "people",
        TOTAL: 82,
    },
    PILOTS: {
        KEY: "pilotsKey",
        NAME: "pilots",
        FETCH_NAME: "people",
        TOTAL: 82,
    },
    PLANETS: {
        KEY: "planetsKey",
        NAME: "planets",
        FETCH_NAME: "planets",
        TOTAL: 60,
    },
    STARSHIPS: {
        KEY: "starshipsKey",
        NAME: "starships",
        FETCH_NAME: "starships",
        TOTAL: 36,
    },
    VEHICLES: {
        KEY: "vehiclesKey",
        NAME: "vehicles",
        FETCH_NAME: "vehicles",
        TOTAL: 39,
    },
    SPECIES: {
        KEY: "speciesKey",
        NAME: "species",
        FETCH_NAME: "species",
        TOTAL: 37,
    },
};
