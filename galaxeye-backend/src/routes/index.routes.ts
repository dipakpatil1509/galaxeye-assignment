import { Router } from "express";
import geolocationRouter from "./geolocation.routes";

const router = Router();

router.use("/geo-location", geolocationRouter);

export default router;
