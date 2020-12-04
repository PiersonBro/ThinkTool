/** @format */

import React from "react";
import SaveCustomNote from "../saveCustomNote";
import DisplayNote from "../displayNote";
import SignIn from "../signIn";
import firebase from "firebase"
import styles from "./styles.css";


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
		<div className={styles.main}>
			<SignIn uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
			<div className={styles.title}>ThinkTool</div>
			{/* <button onClick={() => AddNote(databaseref)}>Save Note</button> */}
			<SaveCustomNote databaseref={databaseref} />
			<DisplayNote databaseref={databaseref} />
		</div>
	);
};

export default Home;
