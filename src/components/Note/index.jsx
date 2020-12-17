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
import { Title } from "./DraggableNode";

const DEBOUNCE_SAVE_DELAY_MS = 1000;

// Autosave function to update the database with the most current note information
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

// use debouncing to make sure we don't overwhelm the database
	useEffect(() => {
		if (data) {
			debouncedSave(data, noteID, databaseref);
		}
	}, [data, debouncedSave]);

	return null;
}

// drag and drop made from an online sample
// https://react-dnd.github.io/react-dnd/examples
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

// make a color tag to show relationships
function Ribbon({color}) {
	var actualColor = "#" + color;
	return (<div className={styles.ribbon} style={{backgroundColor:actualColor}}></div>);
}

class Note extends React.Component {
	constructor(props) {
		super(props);
		this.SaveText = this.SaveText.bind(this);
		this.SaveTitle = this.SaveTitle.bind(this);
		if (this.props.relatedNotes !== undefined) {
			this.state.relations = this.props.relatedNotes.map ((relatedNote) => { 
				var color = relatedNote.replace(new RegExp(".*" + "COLOR:"), '');
				return <Ribbon color={color}/>
			});
		}	
	}

	// state variables, either their actual value or a default one if they haven't been set yet
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

	// method to set the position of a note
	// This is unused at this point because position is not being recorded at this stage of the project
	movePosition(x, y) {
		this.setState({ posX: x, posY: y });
	}

	// a way to save the height and width of a note when it is being resized
	resize() {
		// check if this is the first render, if it is, we don't want to save the default height and width
		if (this.state.firstRender) {
			this.setState({ firstRender: false });
			return;
		}

		// grab the client height and width to save
		const height = this.noteRef.clientHeight;
		const width = this.noteRef.clientWidth;

		this.setState({ height, width });
	}

	// Saving a note's title
	SaveTitle = (event) => {
		this.setState({ title: event.target.value });
	};

	// saving a note's content
	SaveText = (text) => {
		this.setState({ text });
	};

	// create a relationship between two notes
	addRelationship = (noteID, color) => {
		const { relatedNotes } = this.state;
		
		// save the color and the noteID
		relatedNotes.push(`${noteID}COLOR:${color}`)
		this.setState({ relatedNotes });
		this.setState ({
			relations: [...this.state.relations, <Ribbon color={color}/>]
		})
	};

	render() {
		return (
			<React.Fragment>
				{/* wrap in a drop box so that we can use drag and drop for relationships */}
				<DropBox props={this.props} callback = {this.addRelationship.bind(this)}> 
					{drop => (
						<div ref={drop} className={styles.noteblock}>
							<div className={styles.colorwrapper}>
								{this.state.relations}
							</div>
							{/* save the note's title and the relationships between notes */}
							<Title name={this.state.title} callback = {this.SaveTitle.bind(this)} otherProps = {this.props} secondCallback = {this.addRelationship.bind(this)}/>
							<textarea
								style={{
									height: this.props.height,
									width: this.props.width,
								}}
								onChange={(event) => this.SaveText(event.target.value)} // save the content of a note
								cols='40'
								rows='10'
								value={this.state.text}
								placeholder='Text' // a placeholder text until there is custom text
								ref={(noteRef) => (this.noteRef = noteRef)}
							></textarea>
							{/* call out autosave function so the users don't have to deal with it! */}
							<Autosave
								databaseref={this.props.databaseref}
								noteID={this.props.noteID}
								data={this.state}
							/>
						</div>
				)}
				</DropBox>
			</React.Fragment>
		);
	}
}

export default Note;
