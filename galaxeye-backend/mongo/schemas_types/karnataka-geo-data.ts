// import { Date } from "mongoose";
import { Document } from "mongoose";

export interface KarnatakaGeoDataType extends Document {
	type: string;
	properties: {
		fill: string;
	};
	geometry: {
		type: string;
		coordinates: number[][];
	};
	create_datetime: Date;
}
