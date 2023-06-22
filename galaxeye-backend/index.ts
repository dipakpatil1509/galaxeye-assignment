import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import dbConnect from "./mongo/mongoose";
import routes from "./src/routes/index.routes";
import cors from "cors";
import geolocationService from "./src/services/geolocation.service";

const app = express();
const port = parseInt(process.env.PORT || "3000");

app.use(cors())
// support parsing of application/json type post data
app.use(express.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use("/api", routes);

/* Error handler middleware */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	const statusCode = err.statusCode || 500;
	console.log(err);
	res.status(statusCode).json({
		success: false,
		message: err.message,
		data: {},
		customCode: 0,
	});

	return;
});

dbConnect().then(() => {
	app.listen(port, "0.0.0.0", () => {
		console.log(`Example app listening at http://localhost:${port}`);
	});
	// geolocationService.post_location().then((res:any)=>{
	// 	console.log(res)
	// }).catch((err:any)=>{
	// 	console.log(err)
	// })
});
