import { Response } from 'express';
import { CustomRequest } from 'src/interfaces/customRequest.interface';
import {
    applyPagination,
} from "../utils/utilsController";


export const GetEntitiesWithPagination = <T>(defaultPageSize: number) => {
    return (req: CustomRequest<T>, res: Response): void => {
        try {
            const entityName = req.entityName;

            const entitiesPayload: T[] = req[`${entityName}Payload`] || [];

            const { startIndex, endIndex, page, limit, totalPages } = applyPagination(req, defaultPageSize, entitiesPayload.length);

            res.status(200).json({
                [`${entityName}`]: entitiesPayload.slice(startIndex, endIndex),
                pagination: {
                    page,
                    items_per_page: limit,
                    total_items: entitiesPayload.length,
                    total_pages: totalPages
                }
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
            res.status(500).json({ message: errorMessage });
        }
    };
};
