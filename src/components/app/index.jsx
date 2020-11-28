/** @format */

import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "../home/index";
import firebase from "firebase";

const customHistory = createBrowserHistory();

const App = () => {
	const database = firebase.database();
	// Use this to skip over users until we have them
	const ref = database.ref("user/note");

	return (
		<React.Fragment>
			<Router history={customHistory}>
				<Switch>
					{/* <Route path="/about" component={About} /> */}
					<Route path='/'>
						<Home databaseref={ref} />
					</Route>
				</Switch>
			</Router>
		</React.Fragment>
	);
};

export default App;
