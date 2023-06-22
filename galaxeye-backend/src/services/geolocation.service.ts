import KarnatakaGeoData from "../../mongo/models/karnataka-geo-data";
import { KarnatakaGeoDataType } from "../../mongo/schemas_types/karnataka-geo-data";
import { APIResponse, sendResponse } from "../utils/helper";
import karnataka_geo_data from "./karnataka_geojson_id.json";
import {
	polygon,
	booleanWithin,
	Position,
	union,
	Feature,
	multiPolygon,
	FeatureCollection,
	feature,
} from "@turf/turf";
// import axios from "axios";

export type geolocationBody = {
	type: string;
	coordinates: Array<Array<Array<number>>>;
};

const get_location = async (geolocationBody: geolocationBody): Promise<APIResponse> => {
	try {
		const { type, coordinates } = geolocationBody;
		const interesting_data = await KarnatakaGeoData.find({
			geometry: {
				$geoIntersects: {
					$geometry: {
						type: type,
						coordinates: coordinates,
					},
				},
			},
		});

		if (interesting_data.length > 0) {
			const featureCollection:any[]= []
			interesting_data.map((a) => {
				featureCollection.push(a.geometry.coordinates);
			});
			const compositePolygon = multiPolygon(featureCollection)

			console.log(JSON.stringify(compositePolygon))
			
			const isWithinPoly = booleanWithin(
				{
					type: type,
					coordinates: coordinates,
				},
				compositePolygon
			);

			console.log(isWithinPoly)

			if (!isWithinPoly) {
				throw new Error("Correspoding tiles are not covering given polygon");
			}
		}

		return sendResponse({
			data: {
				correspoding_tiles: interesting_data,
			},
		});
	} catch (error: any) {
		return sendResponse({
			success: false,
			message: error + "" || "Something went wrong",
			customCode: 101,
			errorObject: error,
		});
	}
};

const post_location = async (): Promise<APIResponse> => {
	console.log("In post function");
	try {
		//Delete all the previous data
		console.log(process.env.DATASET);
		await KarnatakaGeoData.deleteMany({});
		// const karnataka_data = await axios.get(process.env.DATASET);
		const karnataka_data = karnataka_geo_data as any;
		// console.log(karnataka_data);
		let data: {
			type?: string;
			features?: KarnatakaGeoDataType[];
		} = {};
		if (karnataka_data) {
			data = karnataka_data;
			await KarnatakaGeoData.insertMany(data?.features);
		}
	} catch (error: any) {
		console.log(error);
		return sendResponse({
			success: false,
			message: error || "Something went wrong",
			customCode: 100,
			errorObject: error,
		});
	}

	return sendResponse({
		data: {},
		message: "Successfully inserted data from the dataset",
	});
};

export default {
	get_location,
	post_location,
};
