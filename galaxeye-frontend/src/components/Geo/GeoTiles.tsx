import React from "react";
import { GeoJSON } from "react-leaflet";
import { useAppSelector } from "../../store/hooks";
import { GeoJsonObject } from "geojson";

type Props = {};

function GeoTiles({}: Props) {
	const corresponding_tiles = useAppSelector((state) => state.geo.corresponding_tiles);

	return (
		<>
			{Object.entries(corresponding_tiles).map(([tile_key, tile_val]) =>
				tile_val.map((tile, id) => (
					<GeoJSON
						key={`${tile_key}_${id}`}
						data={tile as GeoJsonObject}
						style={{
							fill: true,
							fillColor: "#fc0000",
							stroke: true,
							color: "#fc0000",
						}}
					/>
				))
			)}
		</>
	);
}

export default GeoTiles;
