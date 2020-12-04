/** @format */

import React from "react";
import SaveCustomNote from "../saveCustomNote";
import DisplayNote from "../displayNote";
import SignIn from "../signIn";
import firebase from "firebase"


const uiConfig = {
	// Popup signin flow rather than redirect flow.
	signInFlow: 'popup',
	// Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
	signInSuccessUrl: '/signedIn',
	// We will display Google and Facebook as auth providers.
	signInOptions: [
	  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
	  firebase.auth.FacebookAuthProvider.PROVIDER_ID
	]
  };

const Home = ({ databaseref }) => {
	return (
		<div>
			<SignIn uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
		</div>
	);
};

export default Home;
