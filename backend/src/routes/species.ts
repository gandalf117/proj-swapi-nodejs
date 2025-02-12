import { Router } from "express";
import { ENTITIES } from "../consts";
import validateSpecies from "../validators/species.validator"
import { getSpeciesPayload } from "../controllers/species.controller";
import { getPeoplePayload } from "../controllers/people.controller";
import { GetData, GetAggregateData } from "../middlewares/getData.middleware"
import { ApplyFilters, ApplyAggregateFilters } from "../middlewares/applyFilters.middleware"
import { GetEntitiesWithPagination } from "../middlewares/getEntities.middleware"
import { Species, SpeciesResponse } from "../entities/species.interface"
import { People, PeopleResponse } from "../entities/people.interface"

const router = Router();

const DEFAULT_PAGE_SIZE = 5;

const FILTERS = ["name", "language", "designation", "classification","hair_colors", "skin_colors", "eye_colors"];

const FILTERS_EXACT_MATCH = ["average_height", "average_lifespan"];

const LOOKUP_PROPS = ["id", "name"];

router.get("/",
    validateSpecies,
    GetData<Species>(ENTITIES.SPECIES.NAME), 
    ApplyFilters<Species>(FILTERS, FILTERS_EXACT_MATCH, getSpeciesPayload), 
    GetEntitiesWithPagination<SpeciesResponse>(DEFAULT_PAGE_SIZE)
);
router.get("/with-people",
    validateSpecies,
    GetAggregateData<Species, People>(ENTITIES.SPECIES.NAME, ENTITIES.PEOPLE.NAME), 
    ApplyAggregateFilters<Species, People, SpeciesResponse, PeopleResponse>(FILTERS, FILTERS_EXACT_MATCH, getSpeciesPayload, getPeoplePayload, LOOKUP_PROPS), 
    GetEntitiesWithPagination<SpeciesResponse>(DEFAULT_PAGE_SIZE)
);

export default router;
