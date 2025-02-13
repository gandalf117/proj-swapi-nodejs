import { Router } from "express";
import { Login, Logout } from "../controllers/auth.controller";
import filmRoutes from "./films";
import planetRoutes from "./planets";
import peopleRoutes from "./people";
import starshipsRoutes from "./starships";
import vehiclesRoutes from "./vehicles";
import speciesRoutes from "./species";
import { AuthMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/login", Login);
router.get("/logout", Logout);
router.use("/films", filmRoutes);
router.use("/planets", planetRoutes);
router.use("/people", peopleRoutes);
router.use("/starships", starshipsRoutes);
router.use("/vehicles", AuthMiddleware, vehiclesRoutes);
router.use("/species", AuthMiddleware, speciesRoutes);

export default router;
