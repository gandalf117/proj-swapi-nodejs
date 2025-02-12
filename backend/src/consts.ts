// Note: TOTAL can be dynamically extracted from each request but 
// since this API has static data (Start wars movies are not going to change soon)
// and to avoid unnecessary complexity a decision has been taken to hardcode these values

export type EntityName = 'films' | 'planets' | 'people' | 'starships' | 'vehicles' | 'species';

interface Entity {
    KEY: string,
    NAME: EntityName;
    TOTAL: number;
}

export const ENTITIES: Record<string, Entity> = {
    FILMS: {
        KEY: "filmsKey",
        NAME: "films",
        TOTAL: 6,
    },
    PEOPLE: {
        KEY: "peoplesKey",
        NAME: "people",
        TOTAL: 82,
    },
    PLANETS: {
        KEY: "planetsKey",
        NAME: "planets",
        TOTAL: 60,
    },
    STARSHIPS: {
        KEY: "starshipsKey",
        NAME: "starships",
        TOTAL: 36,
    },
    VEHICLES: {
        KEY: "vehiclesKey",
        NAME: "vehicles",
        TOTAL: 39,
    },
    SPECIES: {
        KEY: "speciesKey",
        NAME: "species",
        TOTAL: 37,
    },
};
