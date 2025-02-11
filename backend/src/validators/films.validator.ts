import { query, validationResult } from "express-validator";

const validateFilm = [
    query("page").optional().isNumeric().withMessage("Queryparam 'page' must be a number."),
    query("limit").optional().isNumeric().withMessage("Queryparam 'limit' must be a number."),
    query("director").optional().isString().withMessage("Queryparam 'director' must be a string."),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export default validateFilm;
