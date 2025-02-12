import { Router } from "express";
import { ENTITIES } from "../consts";
import validateStarship from "../validators/starships.validator"
import { getStarshipPayload } from "../controllers/starships.controller";
import { getPeoplePayload } from "../controllers/people.controller";
import { GetData, GetAggregateData } from "../middlewares/getData.middleware"
import { ApplyFilters, ApplyAggregateFilters } from "../middlewares/applyFilters.middleware"
import { GetEntitiesWithPagination } from "../middlewares/getEntities.middleware"
import { Starship, StarshipResponse } from "../entities/starships.interface"
import { People, PeopleResponse } from "../entities/people.interface"

const router = Router();

const DEFAULT_PAGE_SIZE = 5;

const FILTERS = ["name", "model", "manufacturer", "consumables", "starship_class"];

const FILTERS_EXACT_MATCH = ["hyperdrive_rating", "MGLT", "cost_in_credits", "length", "crew", "passengers", "max_atmosphering_speed", "cargo_capacity"];

const LOOKUP_PROPS = ["id", "name"];

router.get("/",
    validateStarship,
    GetData<Starship>(ENTITIES.STARSHIPS.NAME), 
    ApplyFilters<Starship>(FILTERS, FILTERS_EXACT_MATCH, getStarshipPayload), 
    GetEntitiesWithPagination<StarshipResponse>(DEFAULT_PAGE_SIZE)
);
router.get("/with-people",
    validateStarship,
    GetAggregateData<Starship, People>(ENTITIES.STARSHIPS.NAME, ENTITIES.PILOTS.NAME), 
    ApplyAggregateFilters<Starship, People, StarshipResponse, PeopleResponse>(FILTERS, FILTERS_EXACT_MATCH, getStarshipPayload, getPeoplePayload, LOOKUP_PROPS), 
    GetEntitiesWithPagination<StarshipResponse>(DEFAULT_PAGE_SIZE)
);

export default router;
