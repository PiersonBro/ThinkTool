/** @format */

import * as React from "react";
import * as ReactDOM from "react-dom";
import { initializeFirebase } from "./firebase/firebase";
import App from "./components/app";

if (typeof window !== "undefined") {
	initializeFirebase();
	ReactDOM.render(<App />, document.getElementById("root"));
}
