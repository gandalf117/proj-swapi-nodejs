import { Router } from "express";
import { ENTITIES } from "../consts";
import validatePeople from "../validators/people.validator"
import { getStarshipPayload } from "../controllers/starships.controller";
import { getVehiclePayload } from "../controllers/vehicles.controller";
import { getPeoplePayload } from "../controllers/people.controller";
import { GetData, GetAggregateData } from "../middlewares/getData.middleware"
import { ApplyFilters, ApplyAggregateFilters } from "../middlewares/applyFilters.middleware"
import { GetEntitiesWithPagination } from "../middlewares/getEntities.middleware"
import { People, PeopleResponse } from "../entities/people.interface"
import { Vehicle, VehicleResponse } from "../entities/vehicles.interface"
import { Starship, StarshipResponse } from "../entities/starships.interface"

const router = Router();

const DEFAULT_PAGE_SIZE = 5;

const FILTERS = ["name", "birth_year", "gender", "hair_color", "skin_color", "eye_color"];

const FILTERS_EXACT_MATCH = ["height", "mass"];

const LOOKUP_PROPS = ["id", "name"];

router.get("/",
    validatePeople,
    GetData<People>(ENTITIES.PEOPLE.NAME), 
    ApplyFilters<People>(FILTERS, FILTERS_EXACT_MATCH, getPeoplePayload), 
    GetEntitiesWithPagination<PeopleResponse>(DEFAULT_PAGE_SIZE)
);

router.get("/with-vehicles",
  validatePeople,
    GetAggregateData<People, Vehicle>(ENTITIES.PEOPLE.NAME, ENTITIES.VEHICLES.NAME), 
    ApplyAggregateFilters<People, Vehicle, PeopleResponse, VehicleResponse>(FILTERS, FILTERS_EXACT_MATCH, getPeoplePayload, getVehiclePayload, LOOKUP_PROPS), 
    GetEntitiesWithPagination<PeopleResponse>(DEFAULT_PAGE_SIZE)
);

router.get("/with-starships",
  validatePeople,
    GetAggregateData<People, Starship>(ENTITIES.PEOPLE.NAME, ENTITIES.STARSHIPS.NAME), 
    ApplyAggregateFilters<People, Starship, PeopleResponse, StarshipResponse>(FILTERS, FILTERS_EXACT_MATCH, getPeoplePayload, getStarshipPayload, LOOKUP_PROPS), 
    GetEntitiesWithPagination<PeopleResponse>(DEFAULT_PAGE_SIZE)
);

export default router;
