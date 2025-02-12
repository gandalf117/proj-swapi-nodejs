import { Router } from "express";
import { ENTITIES } from "../consts";
import validateFilms from "../validators/films.validator"
import { getFilmPayload } from "../controllers/films.controller";
import { getPlanetPayload } from "../controllers/planets.controller";
import { GetData, GetAggregateData } from "../middlewares/getData.middleware"
import { ApplyFilters, ApplyAggregateFilters } from "../middlewares/applyFilters.middleware"
import { GetEntitiesWithPagination } from "../middlewares/getEntities.middleware"
import { Film, FilmResponse } from "../entities/films.interface"
import { Planet, PlanetResponse } from "../entities/planets.interface"

const router = Router();

const DEFAULT_PAGE_SIZE = 5;

const FILTERS = ["title", "episode_id", "director", "producer", "release_date", "opening_crawl"];

router.get("/",
    validateFilms,
    GetData<Film>(ENTITIES.FILMS.NAME), 
    ApplyFilters<Film>(FILTERS, [], getFilmPayload), 
    GetEntitiesWithPagination<FilmResponse>(DEFAULT_PAGE_SIZE)
);
router.get("/with-planets",
    validateFilms,
    GetAggregateData<Film, Planet>(ENTITIES.FILMS.NAME, ENTITIES.PLANETS.NAME), 
    ApplyAggregateFilters<Film, Planet, FilmResponse, PlanetResponse>(FILTERS, [], getFilmPayload, getPlanetPayload, ["id", "name"]), 
    GetEntitiesWithPagination<FilmResponse>(DEFAULT_PAGE_SIZE)
);

export default router;
