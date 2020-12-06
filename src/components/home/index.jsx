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

// Same as Home(const), but a stateful class so that we can add stuff to it?
class Home extends React.Component {

	// Need new notes and displayed notes to be the same class so that we can have an array that contains both saved notes and new notes, and also have the ability to edit saved notes
	state = {
		notes: [],
	}

	addNotes = () => {
		this.setState({
			notes: [...this.state.notes, <SaveCustomNote databaseref={this.props.databaseref} />]
		})
	}

	// Testing out fetching data from database
	loadNotes = () => {
		this.props.databaseref.once("value").then(function (snapshot) {
			console.log(typeof (snapshot.val()));
			Object.entries(snapshot.val()).forEach(([key, value]) => {
				// console.log(`${key} ${value}`);
				console.log('Note ID: ' + value.noteID + ' Note Title: ' + value.title + ' Content: ' + value.content + ' User ID: ' + value.user_id);
			})
		});
	}

	render() {
		return (
			<React.Fragment>
				<div className={styles.main}>
					<div className={styles.title}>ThinkTool</div>
					{/* <button onClick={() => AddNote(databaseref)}>Save Note</button> */}
					{/* <SaveCustomNote databaseref={this.props.databaseref} /> */}
					<DisplayNote databaseref={this.props.databaseref} />
					{this.state.notes}
					<button
						className={styles.addButton}
						onClick={this.loadNotes}
					>Load Notes <br/> in Console</button>
					<button
						className={styles.addButton}
						onClick={this.addNotes}
					>+</button>
				</div>
			</React.Fragment>
		);
	}
}

// export default Home;
export default Home;


