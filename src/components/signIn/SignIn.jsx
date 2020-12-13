/** @format */

import React from "react";
import propTypes from "prop-types";
import firebase from "firebase";
import firebaseui from "firebaseui";
//This class is essentially a rewrite of the firebase-web-react componenet found here:
//https://github.com/firebase/firebaseui-web-react/blob/master/src/FirebaseAuth.jsx
// @flow
const ELEMENT_ID = "firebaseui-auth-container";
let firebaseUIDeletion = Promise.resolve();

class SignIn extends React.Component {
	propTypes = {
		uiConfig: propTypes.object.isRequired,
		firebaseAuth: propTypes.object.isRequired,
		uiCallback: propTypes.function,
		className: propTypes.string,
	};

	constructor(props) {
		super(props);
		this.uiConfig = props.uiConfig;
		this.firebaseAuth = props.firebaseAuth;
		this.className = props.className;
		this.uiCallback = props.uiCallback;
		this.unregisterAuthObserver = () => {};
	}

	componentDidMount() {
		require("firebaseui/dist/firebaseui.css");

		const firebaseui = require("firebaseui");

		return firebaseUIDeletion.then(() => {
			// Get or create a firebaseUI instance
			this.firebaseuiWidget =
				firebaseui.auth.AuthUI.getInstance() ||
				new firebaseui.auth.AuthUI(this.firebaseAuth);
			if (this.uiConfig.signInFlow == "popup") {
				this.firebaseuiWidget.reset();
			}

			this.userSignedIn = false;
			this.unregisterAuthObserver = this.firebaseAuth.onAuthStateChanged(
				(user) => {
					if (!user && this.userSignedIn) {
						this.firebaseuiWidget.reset();
					}
					this.userSignedIn = !!user;
				},
			);

			if (this.uiCallback) {
				this.uiCallback(this.firebaseuiWidget);
			}
			console.log(this.firebaseuiWidget);
			this.firebaseuiWidget.start("#" + ELEMENT_ID, this.uiConfig);
		});
	}

	componentWillUnmount() {
		firebaseUIDeletion = firebaseUIDeletion.then(() => {
			this.unregisterAuthObserver();
			return this.firebaseuiWidget.delete();
		});

		return firebaseUIDeletion;
	}

	render() {
		console.log(this.className);
		return <div className={this.className} id={ELEMENT_ID} />;
	}
}

export default SignIn;
