import { query, validationResult } from "express-validator";
import { commonQueryParams } from "./common.validator";

const validateFilms = [
    ...commonQueryParams,
    query("name").optional().isString().notEmpty().withMessage("Queryparam 'name' must be a string."),
    query("gender").optional().isString().notEmpty().withMessage("Queryparam 'gender' must be a string."),
    query("birth_year").optional().isNumeric().withMessage("Queryparam 'birth_year' must be a number."),
    query("height").optional().isNumeric().withMessage("Queryparam 'height' must be a number."),
    query("mass").optional().isNumeric().withMessage("Queryparam 'mass' must be a number."),
    query("hair_color").optional().isNumeric().withMessage("Queryparam 'hair_color' must be a number."),
    query("skin_color").optional().isNumeric().withMessage("Queryparam 'skin_color' must be a number."),
    query("eye_color").optional().isNumeric().withMessage("Queryparam 'eye_color' must be a number."),
    query("spaceships").optional().isString().notEmpty().withMessage("Queryparam 'spaceships' must be a string."),
    query("vehicles").optional().isString().notEmpty().withMessage("Queryparam 'vehicles' must be a string."),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export default validateFilms;
