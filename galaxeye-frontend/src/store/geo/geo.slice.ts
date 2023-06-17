import { createSlice } from "@reduxjs/toolkit";
import geoSliceType from "./geo.type";

const initialState: geoSliceType = {
	corresponding_tiles: {},
};

const geoSlice = createSlice({
	name: "geo",
	initialState,
	reducers: {
		setCorrespondingTiles(state, action) {
			let { key, value } = action.payload;
			state.corresponding_tiles[key] = value;
		},
		deleteCorrespondingTiles(state, action) {
			const keys = action.payload;
			const local_state = { ...state.corresponding_tiles };
			let anyDeleted = false;
			keys.map((key: any) => {
				if (local_state[key]) {
					delete local_state[key];
					anyDeleted = true;
				}
				return;
			});
			if (anyDeleted) {
				state.corresponding_tiles = local_state;
			}
		},
	},
});

export const { setCorrespondingTiles, deleteCorrespondingTiles } = geoSlice.actions;
const geo = { geoReducer: geoSlice.reducer };
export default geo;
