import { combineReducers } from "@reduxjs/toolkit";
import geoSlice from "./geo/geo.slice";

export const rootReducer = combineReducers({
	geo: geoSlice.geoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
