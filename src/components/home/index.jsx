/** @format */

import React from "react";
import SaveCustomNote from "../saveCustomNote";
import DisplayNote from "../displayNote";
import styles from "./styles.css";

const AddNote = (databaseref) => {
	databaseref.child("abc").set({
		title: "Testing 11/27",
		user_id: "12345",
		content: "testing!",
		noteID: "12345",
	});
};

const Home = ({ databaseref }) => {
	return (
		<div className={styles.main}>
			<div className={styles.title}>ThinkTool</div>
			{/* <button onClick={() => AddNote(databaseref)}>Save Note</button> */}
			<SaveCustomNote databaseref={databaseref} />
			<DisplayNote databaseref={databaseref} />
		</div>
	);
};

export default Home;
