import { Response, NextFunction } from 'express';
import { CustomRequest } from 'src/interfaces/customRequest.interface';
import { ENTITIES, EntityName } from "../consts";
import { fetchItems } from "../services/fetchData";

export const GetData = <T>(entity: EntityName) => {
    return async (req: CustomRequest<T>, res: Response, next: NextFunction) => {
        try {
            const entityKey = entity.toUpperCase();
            const entities: Map<number, T> = await fetchItems(
                entityKey,
                ENTITIES[entityKey].NAME,
                ENTITIES[entityKey].TOTAL,
            );

            req['entityName'] = ENTITIES[entityKey].NAME;
            req[`${entity.toLowerCase()}Map`] = Array.from(entities.entries()) as [number, T][];

            next();
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            res.status(500).json({ message: errorMessage });
        }
    };
};

export const GetAggregateData = <T, R>(entity: EntityName, subEntity: EntityName) => {
    return async (req: CustomRequest<T>, res: Response, next: NextFunction): Promise<void> => {
        try {
            const entityKey = entity.toUpperCase()
            const entities: Map<number, T> = await fetchItems(
                entityKey,
                ENTITIES[entityKey].NAME,
                ENTITIES[entityKey].TOTAL,
            );
            const subEntityKey = subEntity.toUpperCase()
            const subEntities: Map<number, R> = await fetchItems(
                subEntityKey,
                ENTITIES[subEntityKey].NAME,
                ENTITIES[subEntityKey].TOTAL,
            );

            req['entityName'] = ENTITIES[entityKey].NAME;
            req[`${entity.toLowerCase()}Map`] = Array.from(entities.entries()) as [number, T][];

            req['subEntityName'] = ENTITIES[subEntityKey].NAME;
            req[`${subEntity.toLowerCase()}Map`] = subEntities;

            next();
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            res.status(500).json({ message: errorMessage });
        }
    };
};
