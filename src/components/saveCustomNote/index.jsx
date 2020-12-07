/** @format */

import React from "react";
import styles from "./styles.css";
import firebase from "firebase";

class Note extends React.Component {
	// props: {
	// 	databaseref;
	//  title;
	//  text;
	//  noteID;
	// }

	state = {
		title: this.props.title,
		text: this.props.text,
	};

	SaveTitle = (title) => {
		this.setState({ title });
	};

	SaveText = (text) => {
		this.setState({ text });
	};
	// I don't think we should be saving here!
	// But.... I don't understand react well enough to have anything more than an intuition. 
	SaveNote = () => {
		return this.props.databaseref.child(noteID).set({
			title: this.state.title,
			user_id: firebase.auth().currentUser.uid,
			content: this.state.text,
			noteID:  this.props.noteID,
		});
	};

	render() {
		return (
			<React.Fragment>
				<div className={styles.noteblock}>
					<input
						type='text'
						value={this.props.title}
						placeholder="Title"
						onChange={(event) => this.SaveTitle(event.target.value)}
					/>
					<hr />
					<textarea onChange={(event) => this.SaveText(event.target.value)} cols="40" rows="10" value={this.props.text} placeholder="Text"></textarea>
					<button onClick={this.SaveNote} className={styles.savebutton}>Save Note</button>
				</div>
			</React.Fragment>
		);
	}
}

export default Note;
