/** @format */

import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "../home/index";
import firebase from "firebase";
import styles from "./styles.css";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const customHistory = createBrowserHistory();
//Setup our react app
const App = () => {
	return (
		<React.Fragment>
			<Router history={customHistory}>
				<Switch>
					<Route path='/'>
						{/*Wrap the part of app that needs drag n drop support, in this case the entire app. */}
						<DndProvider backend={HTML5Backend}>
							{/* The home page of our app. */}
							<Home/>
						</DndProvider>
					</Route>
				</Switch>
			</Router>
		</React.Fragment>
	);
};

export default App;
