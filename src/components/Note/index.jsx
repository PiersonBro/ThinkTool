/** @format */

import React, { useCallback, useEffect } from "react";
import styles from "./styles.css";
import firebase from "firebase";
import "core-js/stable";
import "regenerator-runtime/runtime";
import debounce from "lodash.debounce";

const DEBOUNCE_SAVE_DELAY_MS = 1000;

function Autosave ({databaseref, noteID, data}) {
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
			debouncedSave(data, noteID, databaseref);
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
		super(props);
		//FIXME: Do we really need this? Seems like it's the best practice but who knows.
		this.SaveText = this.SaveText.bind(this);
		this.SaveTitle = this.SaveTitle.bind(this);
	}

	state = {
		title: this.props.title,
		text: this.props.text,
	};

	SaveTitle = (event) => {
		this.setState({ title: event.target.value });
	};

	SaveText = (text) => {
		this.setState({ text });
	};
	
	render() {
		return (
			<React.Fragment>
				<div className={styles.noteblock}>
					<input
						type='text'
						value={this.state.title}
						placeholder="Title"
						onChange={(event) => this.SaveTitle(event)}
					/>
					<hr />
					<textarea onChange={(event) => this.SaveText(event.target.value)} cols="40" rows="10" value={this.state.text} placeholder="Text"></textarea>
					<Autosave databaseref={this.props.databaseref} noteID={this.props.noteID} data={this.state}/>
				</div>
			</React.Fragment>
		);
	}
}

export default Note;
