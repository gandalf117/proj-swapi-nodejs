import { Request } from 'express';

export interface CustomRequest<T> extends Request {
    entityName?: string;
}

export interface CustomAggregateRequest<T, R, PayloadT, PayloadR> extends Request {
    entityName?: string;
    subEntityName?: string;
}
