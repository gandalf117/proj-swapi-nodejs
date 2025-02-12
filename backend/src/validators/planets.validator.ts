import { query, validationResult } from "express-validator";

const validateFilms = [
    query("page").optional().isNumeric().withMessage("Queryparam 'page' must be a number."),
    query("limit").optional().isNumeric().withMessage("Queryparam 'limit' must be a number."),
    query("sort").optional().isString().withMessage("Queryparam 'sort' must be a string."),
    query("order").optional().isIn(['asc', 'desc']).withMessage("Queryparam 'order' must be either asc or desc."),
    // custom query params
    query("name").optional().isString().withMessage("Queryparam 'name' must be a string."),
    query("climate").optional().isString().withMessage("Queryparam 'climate' must be a string."),
    query("gravity").optional().isString().withMessage("Queryparam 'gravity' must be a string."),
    query("terrain").optional().isString().withMessage("Queryparam 'terrain' must be a string."),
    query("rotation_period").optional().isNumeric().withMessage("Queryparam 'rotation_period' must be a number."),
    query("orbital_period").optional().isNumeric().withMessage("Queryparam 'orbital_period' must be a string."),
    query("diameter").optional().isNumeric().withMessage("Queryparam 'diameter' must be a string."),
    query("surface_water").optional().isNumeric().withMessage("Queryparam 'surface_water' must be a string."),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export default validateFilms;
