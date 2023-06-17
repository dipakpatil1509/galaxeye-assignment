import { LatLngExpression } from "leaflet";
import { GeoDataAPIResponse } from "../../api-handlers/get_corresponding_tiles.handler";

type correspoding_tiles = {
	[leaf_id: number]: GeoDataAPIResponse[];
};
export default interface geoSliceType {
	corresponding_tiles: correspoding_tiles;
}
