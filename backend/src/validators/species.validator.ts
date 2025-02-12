import { query, validationResult } from "express-validator";
import { commonQueryParams } from "./common.validator";

const validateFilms = [
    ...commonQueryParams,
    query("name").optional().isString().notEmpty().withMessage("Queryparam 'name' must be a string."),
    query("language").optional().isString().notEmpty().withMessage("Queryparam 'language' must be a string."),
    query("classification").optional().isString().notEmpty().withMessage("Queryparam 'classification' must be a string."),
    query("designation").optional().isString().notEmpty().withMessage("Queryparam 'designation' must be a string."),
    query("average_height").optional().isNumeric().withMessage("Queryparam 'average_height' must be a number."),
    query("average_lifespan").optional().isNumeric().withMessage("Queryparam 'average_lifespan' must be a number."),
    query("hair_colors").optional().isNumeric().withMessage("Queryparam 'hair_color' must be a number."),
    query("skin_colors").optional().isNumeric().withMessage("Queryparam 'skin_color' must be a number."),
    query("eye_colors").optional().isNumeric().withMessage("Queryparam 'eye_color' must be a number."),
    query("people").optional().isString().notEmpty().withMessage("Queryparam 'people' must be a string."),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export default validateFilms;
