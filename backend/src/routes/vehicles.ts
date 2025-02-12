import { Router } from "express";
import { ENTITIES } from "../consts";
import validateVehicle from "../validators/vehicles.validator"
import { getVehiclePayload } from "../controllers/vehicles.controller";
import { getPeoplePayload } from "../controllers/people.controller";
import { GetData, GetAggregateData } from "../middlewares/getData.middleware"
import { ApplyFilters, ApplyAggregateFilters } from "../middlewares/applyFilters.middleware"
import { GetEntitiesWithPagination } from "../middlewares/getEntities.middleware"
import { Vehicle, VehicleResponse } from "../entities/vehicles.interface"
import { People, PeopleResponse } from "../entities/people.interface"

const router = Router();

const DEFAULT_PAGE_SIZE = 5;

const FILTERS = ["name", "model", "manufacturer", "consumables", "vehicle_class"];

const FILTERS_EXACT_MATCH = ["cost_in_credits", "length", "crew", "passengers", "max_atmosphering_speed", "cargo_capacity"];

const LOOKUP_PROPS = ["id", "name"];

router.get("/",
    validateVehicle,
    GetData<Vehicle>(ENTITIES.VEHICLES.NAME), 
    ApplyFilters<Vehicle>(FILTERS, FILTERS_EXACT_MATCH, getVehiclePayload), 
    GetEntitiesWithPagination<VehicleResponse>(DEFAULT_PAGE_SIZE)
);
router.get("/with-people",
    validateVehicle,
    GetAggregateData<Vehicle, People>(ENTITIES.VEHICLES.NAME, ENTITIES.PILOTS.NAME), 
    ApplyAggregateFilters<Vehicle, People, VehicleResponse, PeopleResponse>(FILTERS, FILTERS_EXACT_MATCH, getVehiclePayload, getPeoplePayload, LOOKUP_PROPS), 
    GetEntitiesWithPagination<VehicleResponse>(DEFAULT_PAGE_SIZE)
);

export default router;
