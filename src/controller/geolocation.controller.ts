import { NextFunction, Request, Response } from "express";
import geolocationService, { geolocationBody } from "../services/geolocation.service";
import { sendResponse } from "../utils/helper";

async function get_location(req: Request, res: Response, next: NextFunction) {
	try {
		const response = await geolocationService.get_location(req.body as geolocationBody);
		res.json(sendResponse(response));
	} catch (err: any) {
		console.error(`Error while reading`, err.message);
		next(err);
	}
}

async function post_location(req: Request, res: Response, next: NextFunction) {
	console.log(req.body, "post_location");
	try {
		const response = await geolocationService.post_location();
		res.status(200).json(sendResponse(response));
	} catch (err: any) {
		console.error(`Error while creating`, err.message);
		next(err);
	}
}

export default {
	get_location,
	post_location,
};
