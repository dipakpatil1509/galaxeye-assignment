import React from "react";
import "./App.css";
import Geo from "./components/Geo/Geo";
import store from "./store/store";
import { Provider } from "react-redux";

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<Geo />
			</div>
		</Provider>
	);
}

export default App;
