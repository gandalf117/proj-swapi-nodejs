import { Router } from "express";
import filmRoutes from "./films";
import planetRoutes from "./planets";
import characterRoutes from "./characters";

const router = Router();

router.use("/films", filmRoutes);
router.use("/planets", planetRoutes);
router.use("/characters", characterRoutes);

export default router;
