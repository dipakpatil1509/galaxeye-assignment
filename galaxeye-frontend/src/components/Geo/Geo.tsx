import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw";
// import { EditControl } from "react-leaflet-draw";
import GeoTiles from "./GeoTiles";
// import { deleteCorrespondingTiles } from "../../store/geo/geo.slice";
// import { useAppDispatch } from "../../store/hooks";
import get_corresponding_tilesHandler from "../../api-handlers/get_corresponding_tiles.handler";
import AddPolygon from "./AddPolygon";

type Props = {};

function Geo({}: Props) {
    // const layerEditing = useRef<NodeJS.Timeout | null>(null);

    // const dispatch = useAppDispatch();

    const onCreated = (e: any) => {
        if (e?.layer) {
            const { geometry } = e.layer.toGeoJSON();
            console.log(geometry);
            if (geometry) {
                get_corresponding_tilesHandler({
                    leaf_id: e?.layer?._leaflet_id,
                    ...geometry,
                });
            }
        }
    };

    // const onEdited = (e: any) => {
    // 	console.log(e);
    // 	if (e?.layers?._layers) {
    // 		//Edit event is firing multiple times, to get the last event fired, added one sec timeout
    // 		if (layerEditing.current) {
    // 			clearTimeout(layerEditing.current);
    // 		}
    // 		layerEditing.current = setTimeout(() => {
    // 			const promises: Promise<void>[] = [];
    // 			Object.keys(e?.layers?._layers).map((layer) => {
    // 				const { geometry } = e?.layers?._layers[layer].toGeoJSON();
    // 				promises.push(
    // 					get_corresponding_tilesHandler({
    // 						leaf_id: layer,
    // 						...geometry,
    // 					})
    // 				);
    // 			});
    // 			Promise.allSettled(promises).then(() => {
    // 				console.log("All corresponding tiles are updated");
    // 			});
    // 			layerEditing.current = null;
    // 		}, 1000);
    // 	}
    // };

    // const onDeleted = (e: any) => {
    // 	console.log(e);
    // 	if (e?.layers?._layers) {
    // 		dispatch(deleteCorrespondingTiles(Object.keys(e?.layers?._layers)));
    // 	}
    // };

    return (
        <div className="w-full h-screen">
            <MapContainer
                center={[12.983481, 77.63093948364259]}
                zoom={13}
                style={{ height: "100vh" }}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                {/* <FeatureGroup>
					<EditControl
						position="topright"
						onCreated={onCreated}
						onEdited={onEdited}
						onDeleted={onDeleted}
						draw={{ polygon: true }}
					/>
				</FeatureGroup> */}
				<AddPolygon onCreated={onCreated} />
                <GeoTiles />
            </MapContainer>
        </div>
    );
}

export default Geo;
