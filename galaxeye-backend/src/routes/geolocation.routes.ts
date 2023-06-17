import { Router } from "express";
import geolocationController from "../controller/geolocation.controller";

const router = Router();

// router.get("/", geolocationController.get_initial_location);
router.post("/get", geolocationController.get_location);
router.post("/", geolocationController.post_location);

export default router;
