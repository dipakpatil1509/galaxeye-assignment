import { Schema, Model } from "mongoose";
import createModel from "../createModel";
import { KarnatakaGeoDataType } from "../schemas_types/karnataka-geo-data";

type KarnatakaGeoDataModelType = Model<KarnatakaGeoDataType, {}>;

const KarnatakaGeoDataSchema = new Schema<KarnatakaGeoDataType, KarnatakaGeoDataModelType>({
	type: { type: String, required: [true, "Type is required"] },
	properties: {
		fill: { type: String, required: false },
	},
	geometry: {
		type: { type: String, required: [true, "Type is required"] },
		coordinates: { type: Array, required: false },
	},
	create_datetime: { type: Date, default: Date.now },
});

const KarnatakaGeoData = createModel<KarnatakaGeoDataType, KarnatakaGeoDataModelType>(
	"karnataka-geo-data",
	KarnatakaGeoDataSchema
);
export default KarnatakaGeoData;
