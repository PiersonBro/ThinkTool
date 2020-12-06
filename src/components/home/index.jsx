/** @format */

import React from "react";
import SaveCustomNote from "../saveCustomNote";
import DisplayNote from "../displayNote";
import SignInFlow from "../signIn/SignInFlow";
import firebase from "firebase"
import styles from "./styles.css";

const Home = ({ databaseref }) => {
	return (
		<div className={styles.main}>
			<div className={styles.title}>ThinkTool</div>
			<SaveCustomNote databaseref={databaseref} />
			<DisplayNote databaseref={databaseref} />
			<SignInFlow/>
		</div>
	);
};

export default Home;
