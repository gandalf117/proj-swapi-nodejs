import { query, validationResult } from "express-validator";
import { commonQueryParams } from "./common.validator";

const validateFilms = [
    ...commonQueryParams,
    query("name").optional().isString().notEmpty().withMessage("Queryparam 'name' must be a string."),
    query("climate").optional().isString().withMessage("Queryparam 'climate' must be a string."),
    query("gravity").optional().isString().withMessage("Queryparam 'gravity' must be a string."),
    query("terrain").optional().isString().withMessage("Queryparam 'terrain' must be a string."),
    query("rotation_period").optional().isNumeric().withMessage("Queryparam 'rotation_period' must be a number."),
    query("orbital_period").optional().isNumeric().withMessage("Queryparam 'orbital_period' must be a number."),
    query("diameter").optional().isNumeric().withMessage("Queryparam 'diameter' must be a number."),
    query("population").optional().isNumeric().withMessage("Queryparam 'population' must be a number."),
    query("surface_water").optional().isNumeric().withMessage("Queryparam 'surface_water' must be a number."),
    query("films").optional().isString().notEmpty().withMessage("Queryparam 'films' must be a string."),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export default validateFilms;
