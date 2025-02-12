import { Router } from "express";
import { ENTITIES } from "../consts";
import validatePlanets from "../validators/planets.validator"
import { getFilmPayload } from "../controllers/films.controller";
import { getPlanetPayload } from "../controllers/planets.controller";
import { GetData, GetAggregateData } from "../middlewares/getData.middleware"
import { ApplyFilters, ApplyAggregateFilters } from "../middlewares/applyFilters.middleware"
import { GetEntitiesWithPagination } from "../middlewares/getEntities.middleware"
import { Film, FilmResponse } from "../entities/films.interface"
import { Planet, PlanetResponse } from "../entities/planets.interface"

const router = Router();

const DEFAULT_PAGE_SIZE = 5;

const FILTERS = ["name", "climate", "gravity", "terrain"];

const FILTERS_EXACT_MATCH = ["rotation_period", "orbital_period", "diameter", "surface_water", "population"];

router.get("/",
    validatePlanets,
    GetData<Planet>(ENTITIES.PLANETS.NAME), 
    ApplyFilters<Planet>(FILTERS, FILTERS_EXACT_MATCH, getPlanetPayload), 
    GetEntitiesWithPagination<PlanetResponse>(DEFAULT_PAGE_SIZE)
);
router.get("/with-films",
    validatePlanets,
    GetAggregateData<Planet, Film>(ENTITIES.PLANETS.NAME, ENTITIES.FILMS.NAME), 
    ApplyAggregateFilters<Planet, Film, PlanetResponse, FilmResponse>(FILTERS, FILTERS_EXACT_MATCH, getPlanetPayload, getFilmPayload, ["id", "title"]), 
    GetEntitiesWithPagination<PlanetResponse>(DEFAULT_PAGE_SIZE)
);

export default router;
