/** @format */

import React, { useCallback, useEffect } from "react";
import styles from "./styles.css";
import firebase from "firebase";
import "core-js/stable";
import "regenerator-runtime/runtime";
import debounce from "lodash.debounce";

const DEBOUNCE_SAVE_DELAY_MS = 1000;

function Autosave ({databaseref, noteID, data}) {
	console.log("what")
	// console.log(databaseref);
	// console.log(noteID);
	const debouncedSave = useCallback(
		debounce(async (newData, noteID, ref) => {
			await databaseref.child(noteID).set({
				title: newData.title,
				user_id: firebase.auth().currentUser.uid,
				content: newData.text,
				noteID:  noteID,
			});
		}, DEBOUNCE_SAVE_DELAY_MS), 
		[],
	);
	
	useEffect(() => {
		if (data) {
			console.log("debouncing!!!");
			// debouncedSave(data, noteID, databaseref);
		}
	}, [data, debouncedSave])

	return null;
}


class Note extends React.Component {
	// props: {
	// 	databaseref;
	//  title;
	//  text;
	//  noteID;
	// }

	constructor(props) {
		console.log("hello!!!!!");
		super(props);
		this.saveText = this.saveText.bind(this);
		this.handleSubmit = this.saveText.bind(this);
	}

	state = {
		title: this.props.title,
		text: this.props.text,
	};

	saveTitle = (title) => {
		console.log(title);
		console.log("triggered!!");
		this.setState({ title });
	};

	saveText = (text) => {
		this.setState({ text });
	};
	
	render() {
		// console.log(this.props.noteID);
		return (
			<React.Fragment>
				<div className={styles.noteblock}>
					<input
						type='text'
						value={this.props.title}
						placeholder="Title"
						onChange={(event) => this.saveTitle(event.target.value)}
					/>
					<hr />
					<textarea onChange={(event) => this.saveText(event.target.value)} cols="40" rows="10" value={this.props.text} placeholder="Text"></textarea>
					{/* <Autosave databaseref={this.props.databaseref} noteID={this.props.noteID} data={this.state}/> */}
				</div>
			</React.Fragment>
		);
	}
}

export default Note;
