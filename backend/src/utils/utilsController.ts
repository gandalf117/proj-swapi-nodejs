import { Request } from "express";

export const applyPagination = (
    req: Request,
    limitDefault: number,
    totalSize: number
  ): { startIndex: number; endIndex: number } => {
    const limit = Number(req.query.limit) || limitDefault;
    const totalPages = Math.ceil(totalSize / limit);
    // make sure the current page is not bigger than the total possible pages
    const page = Math.min(Number(req.query.page) || 1, totalPages);
    
    return {
      startIndex: (page - 1) * limit,
      endIndex: Math.min(page * limit, totalSize),
    };
};

type Item = {
    [key: string]: any;
};

export const applyFilters = (req: Request, items: [number, Item][], props: string[]): [number, Item][] => {
    return props.reduce((filteredItems, prop) => {
        const queryValue = req.query[prop];
        if (queryValue) {
            return filteredItems.filter(([id, item]) => 
                item[prop] && item[prop].toLowerCase().includes(String(queryValue).toLowerCase())
            );
        }
        return filteredItems;
    }, items);
};

export const applySort = (req: Request, items: [number, Item][]): [number, Item][] => {
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
