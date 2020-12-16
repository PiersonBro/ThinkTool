/** @format */

import React, { useCallback, useEffect } from "react";
import styles from "./styles.css";
import firebase from "firebase";
import propTypes from "prop-types";
import "core-js/stable";
import "regenerator-runtime/runtime";
import debounce from "lodash.debounce";

const DEBOUNCE_SAVE_DELAY_MS = 1000;

function Autosave({ databaseref, noteID, data }) {
	const debouncedSave = useCallback(
		debounce(async (newData, noteID, ref) => {
			await databaseref.child(noteID).set({
				title: newData.title,
				user_id: firebase.auth().currentUser.uid,
				content: newData.text,
				noteID: noteID,
				relatedNotes: newData.relatedNotes,
				width: newData.width,
				height: newData.height,
				posX: newData.posX,
				posY: newData.posY,
			});
		}, DEBOUNCE_SAVE_DELAY_MS),
		[],
	);

	useEffect(() => {
		if (data) {
			debouncedSave(data, noteID, databaseref);
		}
	}, [data, debouncedSave]);

	return null;
}

class Note extends React.Component {
	propTypes = {
		databaseref: propTypes.object.isRequired,
		title: propTypes.string,
		text: propTypes.string,
		noteID: propTypes.string.isRequired,
		relatedNotes: propTypes.arrayOf(propTypes.string),
		width: propTypes.number,
		height: propTypes.number,
		posX: propTypes.number,
		posY: propTypes.number,
	};

	constructor(props) {
		super(props);
		//FIXME: Do we really need this? Seems like it's the best practice but who knows.
		this.SaveText = this.SaveText.bind(this);
		this.SaveTitle = this.SaveTitle.bind(this);
	}

	state = {
		title: this.props.title,
		text: this.props.text,
		id: this.props.noteID,
		newRelatedNote: "",
		relatedNotes: this.props.relatedNotes || [],
		height: this.props.height || 100,
		width: this.props.width || 100,
		firstRender: true,
		posX: this.props.posX || 0,
		posY: this.props.posY || 0,
	};

	componentDidMount() {
		if (window.ResizeObserver) {
			const input = this.noteRef,
				observer = new ResizeObserver(() => {
					this.resize();
				});
			observer.observe(input);
		}
	}

	movePosition(x, y) {
		this.setState({ posX: x, posY: y });
	}

	resize() {
		if (this.state.firstRender) {
			this.setState({ firstRender: false });
			return;
		}

		const height = this.noteRef.clientHeight;
		const width = this.noteRef.clientWidth;

		this.setState({ height, width });
	}

	SaveTitle = (event) => {
		this.setState({ title: event.target.value });
	};

	SaveText = (text) => {
		this.setState({ text });
	};

	updateNewRelatedNoteState = (text) => {
		this.setState({ newRelatedNote: text });
	};

	addRelationship = () => {
		const { newRelatedNote, relatedNotes } = this.state;

		relatedNotes.push(newRelatedNote);

		this.setState({ relatedNotes });
	};

	render() {
		return (
			<React.Fragment>
				<div id={this.state.id} className={styles.noteblock}>
					<input
						type='text'
						value={this.state.title}
						placeholder='Title'
						onChange={(event) => this.SaveTitle(event)}
					/>
					<hr />
					<textarea
						style={{
							height: this.props.height,
							width: this.props.width,
						}}
						onChange={(event) => this.SaveText(event.target.value)}
						cols='40'
						rows='10'
						value={this.state.text}
						placeholder='Text'
						ref={(noteRef) => (this.noteRef = noteRef)}
					></textarea>
					<Autosave
						databaseref={this.props.databaseref}
						noteID={this.props.noteID}
						data={this.state}
					/>
					{/* This is quick UI input to test that relationships can be added to the database */}
					<input
						type='text'
						value={this.state.newRelatedNote}
						placeholder='relationship'
						onChange={(event) =>
							this.updateNewRelatedNoteState(event.target.value)
						}
					/>
					<button onClick={this.addRelationship}>
						Add Relationship
					</button>
					<div>Related Notes: {this.state.relatedNotes}</div>
					{/* <div>
						width: {this.state.width} height: {this.state.height}
					</div> */}
				</div>
			</React.Fragment>
		);
	}
}

export default Note;
