/** @format */

import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "../home/index";
import firebase from "firebase";
import styles from "./styles.css";

const customHistory = createBrowserHistory();

const App = () => {
	return (
		<React.Fragment>
			<Router history={customHistory}>
				<Switch>
					{/* <Route path="/about" component={About} /> */}
					<Route path='/'>
						<Home/>
					</Route>
				</Switch>
			</Router>
		</React.Fragment>
	);
};

export default App;
