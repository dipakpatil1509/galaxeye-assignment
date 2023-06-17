import { LatLngExpression } from "leaflet";
import request_handler from "./request.handler";
import urls from "./urls";
import store from "../store/store";
import { setCorrespondingTiles } from "../store/geo/geo.slice";

export type GeoDataAPIResponse = {
	type: string;
	properties: {
		fill: string;
	};
	geometry: {
		type: string;
		coordinates: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][];
	};
	create_datetime: Date;
};

export type GeoDirectDataAPIResponse = {
	correspoding_tiles: GeoDataAPIResponse[];
};

export default async function ({
	leaf_id,
	type = "",
	coordinates = [],
}: {
	leaf_id: number;
	type: string;
	coordinates: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][];
}) {
	try {
        if (!leaf_id || coordinates.length === 0) {
            return;
        }
        const res = await request_handler({
            method: "post",
            endpoint: urls.api.get_location,
            data: {
                type,
                coordinates,
            },
        })
        store.dispatch(
            setCorrespondingTiles({
                key: leaf_id,
                value: (res.data as GeoDirectDataAPIResponse)?.correspoding_tiles,
            })
        );
    } catch (error) {
        console.log(error);
        alert("OOPS! Error Occured. Please check console for the error!");
    }
}
