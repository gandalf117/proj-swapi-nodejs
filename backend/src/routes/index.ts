import { Router } from "express";
import filmRoutes from "./films";
import characterRoutes from "./characters";

const router = Router();

router.use("/films", filmRoutes);
router.use("/characters", characterRoutes);

export default router;
