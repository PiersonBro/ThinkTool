/** @format */

import React, { useCallback, useEffect } from "react";
import styles from "./styles.css";
import firebase from "firebase";
import propTypes from "prop-types";
import { useDrop } from 'react-dnd';
import {ItemTypes} from "../ItemTypes.js"
import "core-js/stable";
import "regenerator-runtime/runtime";
import debounce from "lodash.debounce";
import { Box } from "./DraggableNode";

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

function DropBox({props, children,callback}) {
	const [{ canDrop, isOver }, drop] = useDrop({
		accept: ItemTypes.NOTE,
		drop: () => ({ props: props, callback: callback}),
		canDrop(item, monitor) {
			//You can't form a relationship with yourself.
			return props.noteID != item.otherProps.noteID;
		},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop(),
		})
	}); 

	return children(drop)
}
const rectStyles = {
    rectangle: {
        width: '50px',
        height: '50px',
    }
}

function Ribbon({color}) {
	// console.log(color);
	var actualColor = "#" + color;
	// console.log("actual color is:")
	// console.log(actualColor);
	return (<div style={rectStyles.rectangle} style={{color:actualColor}}><p>H</p></div>);
}

class Note extends React.Component {
	// propTypes = {
	// 	databaseref: propTypes.object.isRequired,
	// 	title: propTypes.string,
	// 	text: propTypes.string,
	// 	noteID: propTypes.string.isRequired,
	// 	relatedNotes: propTypes.arrayOf(propTypes.string),
	// 	width: propTypes.number,
	// 	height: propTypes.number,
	// 	posX: propTypes.number,
	// 	posY: propTypes.number,
	// };

	constructor(props) {
		super(props);
		//FIXME: Do we really need this? Seems like it's the best practice but who knows.
		this.SaveText = this.SaveText.bind(this);
		this.SaveTitle = this.SaveTitle.bind(this);
			this.state.relations = this.props.relatedNotes.map ((relatedNote) => { 
				// console.log(relatedNote);
				var color = relatedNote.replace(new RegExp(".*" + "COLOR:"), '');
				console.log(color);
				return <Ribbon color={color}/>
			});
	}

	state = {
		title: this.props.title,
		text: this.props.text,
		newRelatedNote: "",
		relatedNotes: this.props.relatedNotes || [],
		height: this.props.height || 100,
		width: this.props.width || 100,
		firstRender: true,
		posX: this.props.posX || 0,
		posY: this.props.posY || 0,
		relations: [],
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

	addRelationship = (noteID, color) => {
		const { relatedNotes } = this.state;

		relatedNotes.push(`${noteID}COLOR:${color}`)
		console.log(this.state);
		this.setState({ relatedNotes });
		console.log(this.state);
		console.log(this.state.relations);
		this.setState ({
			relations: [...this.state.relations, <Ribbon color={color}/>]
		})
		console.log(this.state.relations);
	};

	render() {
		return (
			<React.Fragment>
				<DropBox props={this.props} callback = {this.addRelationship.bind(this)}> 
					{drop => (
						<div ref={drop} className={styles.noteblock}>
							<Box name={this.state.title} callback = {this.SaveTitle.bind(this)} otherProps = {this.props} secondCallback = {this.addRelationship.bind(this)}/>
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
							{/* <input
								type='text'
								value={this.state.newRelatedNote}
								placeholder='relationship'
								onChange={(event) =>
									this.updateNewRelatedNoteState(event.target.value)
								}
							/> */}
							{/* <button onClick={this.addRelationship}>
								Add Relationship
							</button> */}
							{/* <div>Related Notes: {this.state.relatedNotes}</div> */}
							{this.state.relations}
						</div>
				)}
				</DropBox>
			</React.Fragment>
		);
	}
}

export default Note;
