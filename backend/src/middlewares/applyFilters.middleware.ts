import { Response, NextFunction } from 'express';
import { CustomRequest, CustomAggregateRequest } from 'src/interfaces/customRequest.interface';
import {
    applyFilters,
    applyFiltersExact,
    applyMultiFilters,
    applySort,
    extractEntities,
} from "../utils/utilsController";


export const ApplyFilters = <T>(
    filters: string[],
    exactFilters: string[],
    getPayload: (id: number, entity: T) => any
) => {
    return (req: CustomRequest<T>, res: Response, next: NextFunction): void => {
        try {
            const entityName = req.entityName;
            const entityMap: [number, T][] = req[`${entityName}Map`];

            let filteredEntities = applyFiltersExact(req, entityMap, exactFilters);
            filteredEntities = applyFilters(req, filteredEntities, filters);
            filteredEntities = applySort(req, filteredEntities);

            req[`${entityName}Payload`] = filteredEntities.map(([id, entity]) => getPayload(id, entity));

            next();
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
            res.status(500).json({ message: errorMessage });
        }
    };
};

export const ApplyAggregateFilters = <T, R, PayloadT, PayloadR>(
    filters: string[],
    exactFilters: string[],
    getPayload: (id: number, entity: T) => any,
    getSubPayload: (id: number, entity: R) => any,
    lookupFields: string[]
) => {
    return (req: CustomAggregateRequest<T, R, PayloadT, PayloadR>, res: Response, next: NextFunction) => {
        try {
            const entityName = req.entityName;
            const subEntityName = req.subEntityName;
            const entityMap: [number, T][] = req[`${entityName}Map`];
            const subEntityMap: Map<number, R> = req[`${subEntityName}Map`];
console.log('entityMap:::', entityMap.length, entityName, subEntityName)
            let filteredEntities = applyFiltersExact(req, entityMap, exactFilters);
            filteredEntities = applyFilters(req, filteredEntities, filters);
            filteredEntities = applySort(req, filteredEntities);

            const entitiesPayload = filteredEntities.map(([id, entity]) => {
                return {
                    ...getPayload(id, entity),
                    [subEntityName]: extractEntities<R, PayloadR>(entity[subEntityName], subEntityMap, getSubPayload),
                }
            });
console.log('filteredEntities1:::', entitiesPayload.length)
            req[`${entityName}Payload`] = applyMultiFilters(req, entitiesPayload, subEntityName, lookupFields);
console.log('filteredEntities2:::', entitiesPayload.length)
            next();
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
            res.status(500).json({ message: errorMessage });
        }
    };
};
