import { Request } from "express";
import { extractIdFromURL } from "../utils/utilsService";
import { Film } from "../entities/films.interface";
import { Planet } from "../entities/planets.interface";

export const applyPagination = (
    req: Request,
    limitDefault: number,
    totalSize: number
  ): { page: number, limit: number, totalPages: number, startIndex: number; endIndex: number } => {
    const limit = Number(req.query.limit) || limitDefault;
    const totalPages = Math.ceil(totalSize / limit);
    // make sure the current page is not bigger than the total possible pages
    const page = Math.min(Number(req.query.page) || 1, totalPages);
    
    return {
        page,
        limit,
        totalPages,
        startIndex: (page - 1) * limit,
        endIndex: Math.min(page * limit, totalSize),
    };
};

type Item = {
    [key: string]: Planet | Film;
};

// applys an array of filters where the seached for value needs to be contained (not exact match)
export const applyFilters = <T>(req: Request, items: [number, T][], props: string[]): [number, T][] => {
    return props.reduce((filteredItems, prop) => {
        const queryValue = req.query[prop];
        
        if (queryValue) {
            return filteredItems.filter(([id, item]) =>
                item[prop] !== undefined && String(item[prop]).toLowerCase().includes(String(queryValue).toLowerCase())
            );
        }
        return filteredItems;
    }, items);
};

// applys an array of filters where the seached for value needs to exactly match
export const applyFiltersExact = <T>(req: Request, items: [number, T][], props: string[]): [number, T][] => {
    return props.reduce((filteredItems, prop) => {
        const queryValue = req.query[prop];
        
        if (queryValue) {
            return filteredItems.filter(([id, item]) =>
                item[prop] !== undefined && String(item[prop]) === queryValue
            );
        }
        return filteredItems;
    }, items);
};

// looks for multiple values for a given property on the array
export const applyMultiFilters = <EntityPayload>(
    req: Request,
    items: EntityPayload[],
    deepProp: string,
    props: string[]
): EntityPayload[] => {
    const queryValue = String(req.query[deepProp] ?? '').split(',').filter(Boolean);
    // This has the potential to be a very costly operation but given the context it is used in,
    // all three arrays are likely to be quite short, one of the arrays is not going to exceed length of 2
    return queryValue.length ? items.filter((item) => {
        return Array.isArray(item[deepProp]) && item[deepProp].some(el => 
            props.some(prop => el[prop] && queryValue.some(qval => 
                    String(el[prop]).toLowerCase().includes(qval.toLowerCase())
                )
            )
        )
    }) : items;
};

export const applySort = <T>(req: Request, items: [number, T][]): [number, T][] => {
    const order = req.query.order || 'asc';
    const property = String(req.query.sort);
    return property ? items.sort((a, b) => {
        const aValue = a[1][property];
        const bValue = b[1][property];

        // Handle cases where aValue or bValue could be undefined
        if (aValue === undefined || bValue === undefined) {
            return 0; // Leave their order unchanged
        }

        // Determine sorting order
        const comparison = (aValue < bValue) ? -1 : (aValue > bValue) ? 1 : 0;

        return order === 'asc' ? comparison : -comparison;
    }) : items;
};

export const extractEntities = <T, R>(
    itemUrls: string[],
    items: Map<number, T>,
    getEntityPayload: (id: number, item: T) => R
): (R | {})[] => {
    return itemUrls.map(url => {
        const id = extractIdFromURL(url);
        const item = items.get(id);
        return item ? getEntityPayload(id, item) : {};
    });
}
