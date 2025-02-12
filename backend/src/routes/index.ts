import { Router } from "express";
import filmRoutes from "./films";
import planetRoutes from "./planets";
import peopleRoutes from "./people";
import starshipsRoutes from "./starships";
import vehiclesRoutes from "./vehicles";
import speciesRoutes from "./species";

const router = Router();

router.use("/films", filmRoutes);
router.use("/planets", planetRoutes);
router.use("/people", peopleRoutes);
router.use("/starships", starshipsRoutes);
router.use("/vehicles", vehiclesRoutes);
router.use("/species", speciesRoutes);

export default router;
