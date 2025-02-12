import { query, validationResult } from "express-validator";

const validateFilms = [
    query("page").optional().isNumeric().withMessage("Queryparam 'page' must be a number."),
    query("limit").optional().isNumeric().withMessage("Queryparam 'limit' must be a number."),
    query("sort").optional().isString().withMessage("Queryparam 'sort' must be a string."),
    query("order").optional().isIn(['asc', 'desc']).withMessage("Queryparam 'order' must be either asc or desc."),
    // custom query params
    query("title").optional().isString().withMessage("Queryparam 'title' must be a string."),
    query("episode_id").optional().isNumeric().withMessage("Queryparam 'episode_id' must be a number."),
    query("opening_crawl").optional().isString().withMessage("Queryparam 'opening_crawl' must be a string."),
    query("director").optional().isString().withMessage("Queryparam 'director' must be a string."),
    query("producer").optional().isString().withMessage("Queryparam 'producer' must be a string."),
    query("release_date").optional().isNumeric().isLength({ min: 4, max: 4 }).withMessage("Queryparam 'release_date' must be a four digit number."),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export default validateFilms;
