import KarnatakaGeoData from "../../mongo/models/karnataka-geo-data";
import { KarnatakaGeoDataType } from "../../mongo/schemas_types/karnataka-geo-data";
import { APIResponse, sendResponse } from "../utils/helper";
import axios from "axios";

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
		if (process.env.DATASET) {
			console.log(process.env.DATASET);
			await KarnatakaGeoData.deleteMany({});
			const karnataka_data = await axios.get(process.env.DATASET);
			let data: {
				type?: string;
				features?: KarnatakaGeoDataType[];
			} = {};
			if (karnataka_data.data) {
				data = karnataka_data.data;
				await KarnatakaGeoData.insertMany(data?.features);
			}
		}
	} catch (error: any) {
		return sendResponse({
			success: false,
			message: error || "Something went wrong",
			customCode: 100,
			errorObject: error,
		});
	}

	return sendResponse({
		data: {},
		message: "Successfully inserted data from the dataset"
	});
};

export default {
	get_location,
	post_location,
};
