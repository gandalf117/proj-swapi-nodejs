import { Router } from "express";
import { GetFilms, GetFilmsWithPlanets } from "../controllers/films.controller"
import validateFilm from "../validators/films.validator"

const router = Router();

router.get("/", validateFilm, GetFilms);
router.get("/with-planets", validateFilm, GetFilmsWithPlanets);

export default router;
