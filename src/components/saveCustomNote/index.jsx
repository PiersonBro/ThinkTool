/** @format */

import React from "react";
import styles from "./styles.css";
import firebase from "firebase";

class SaveCustomNote extends React.Component {
	// props: {
	// 	databaseref;
	// }

	state = {
		title: "",
		text: "",
	};

	SaveTitle = (title) => {
		this.setState({ title });
	};

	SaveText = (text) => {
		this.setState({ text });
	};

	SaveNote = () => {
		var noteID = Math.floor(Math.random() * Math.floor(1000)) + firebase.auth().currentUser.uid;
		return this.props.databaseref.child(noteID).set({
			title: this.state.title,
			user_id: firebase.auth().currentUser.uid,
			content: this.state.text,
			noteID:  noteID,
		});
	};

	render() {
		return (
			<React.Fragment>
				<div className={styles.noteblock}>
					<input
						type='text'
						placeholder='Title'
						onChange={(event) => this.SaveTitle(event.target.value)}
					/>
					<hr />
					<textarea onChange={(event) => this.SaveText(event.target.value)} cols="40" rows="10" placeholder='Text'></textarea>
					<button onClick={this.SaveNote} className={styles.savebutton}>Save Note</button>
				</div>
			</React.Fragment>
		);
	}
}

export default SaveCustomNote;
