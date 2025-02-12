import { query, validationResult } from "express-validator";
import { commonQueryParams } from "./common.validator";

const validateFilms = [
    ...commonQueryParams,
    query("name").optional().isString().notEmpty().withMessage("Queryparam 'name' must be a string."),
    query("model").optional().isString().notEmpty().withMessage("Queryparam 'model' must be a string."),
    query("manufacturer").optional().isString().notEmpty().withMessage("Queryparam 'manufacturer' must be a string."),
    query("consumables").optional().isString().notEmpty().withMessage("Queryparam 'consumables' must be a string."),
    query("vehicle_class").optional().isString().notEmpty().withMessage("Queryparam 'vehicle_class' must be a string."),
    query("cost_in_credits").optional().isNumeric().withMessage("Queryparam 'cost_in_credits' must be a number."),
    query("length").optional().isNumeric().withMessage("Queryparam 'length' must be a number."),
    query("crew").optional().isNumeric().withMessage("Queryparam 'crew' must be a number."),
    query("passengers").optional().isNumeric().withMessage("Queryparam 'passengers' must be a number."),
    query("max_atmosphering_speed").optional().isNumeric().withMessage("Queryparam 'max_atmosphering_speed' must be a number."),
    query("cargo_capacity").optional().isNumeric().withMessage("Queryparam 'cargo_capacity' must be a number."),
    query("pilots").optional().isString().notEmpty().withMessage("Queryparam 'pilots' must be a string."),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export default validateFilms;
