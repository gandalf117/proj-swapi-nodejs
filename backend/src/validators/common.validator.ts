import { query } from "express-validator";

export const commonQueryParams = [
    query("page").optional().isNumeric().notEmpty().withMessage("Query param 'page' must be a number."),
    query("limit").optional().isNumeric().notEmpty().withMessage("Query param 'limit' must be a number."),
    query("sort").optional().isString().notEmpty().withMessage("Query param 'sort' must be a string."),
    query("order").optional().isIn(['asc', 'desc']).notEmpty().withMessage("Query param 'order' must be either 'asc' or 'desc.'"),
];
