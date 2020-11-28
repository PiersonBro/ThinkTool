/** @format */

import React from "react";
import SaveCustomNote from "../saveCustomNote";
import DisplayNote from "../displayNote";

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
		<div>
			<div>hello</div>
			<button onClick={() => AddNote(databaseref)}>Save Note</button>
			<SaveCustomNote databaseref={databaseref} />
			<DisplayNote databaseref={databaseref} />
		</div>
	);
};

export default Home;
