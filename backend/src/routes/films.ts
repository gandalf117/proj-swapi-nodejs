import { Router } from "express";
import { GetFilms, GetFilmsWithStarships } from "../controllers/films.controller"
import validateFilm from "../validators/films.validator"

const router = Router();

router.get("/", validateFilm, GetFilms);
router.get("/with-starships", validateFilm, GetFilmsWithStarships);

export default router;
