/** @format */

import React from "react";
import Note from "../Note";
import SignInFlow from "../signIn/SignInFlow";
import firebase from "firebase"
import styles from "./styles.css";

class Home extends React.Component {

	state = {
		notes: [],
	}
	// A function to add note componenets to be rendered.
	// This can either be an empty note from the user, or a pre-exisitng note from the database. 
	addNotes = (note) => {
		var noteID; 
		if (note.noteID !== undefined) {
			noteID = note.noteID;
		} else {
			// Our note ID is a randomly generated number and the current user's note ID.
			noteID = Math.floor(Math.random() * Math.floor(1000)) + firebase.auth().currentUser.uid;
		}
		//Update our state so that react can render our notes.
		this.setState({
			notes: [...this.state.notes, <Note title={note.title === undefined ? "" : note.title} databaseref={this.databaseref} text={note.content === undefined ? "" : note.content} key ={noteID} noteID = {noteID} relatedNotes={note.relatedNotes} width = {note.width} height = {note.height} posX = {note.posX} posY = {note.posY} />]
		})
	}
	//Grab each note from firebase and load it into our UI.
	loadNotes = () => {
		var home = this;		
		this.databaseref.once("value").then(function (snapshot) {
			Object.values(snapshot.val()).forEach((value) => {
				 home.addNotes(value);
			})
		});
	}
	// Once the user is logged in this function is called.
	signInCallback = () => {
		if (this.databaseref === undefined) {
			var database = firebase.database();
			this.databaseref = database.ref(firebase.auth().currentUser.uid.toString()+"/note");
			//Load their notes.
			this.loadNotes();
		}
	}

	render() {
		return (
			<React.Fragment>
				<div className={styles.main}>
					<div className={styles.title}>ThinkTool</div>
					{this.databaseref === undefined ? <h3 className={styles.loading}>loading...</h3> : this.state.notes}
					<button
						className={styles.addButton}
						onClick={this.addNotes}
					>+</button>
					<SignInFlow callback={this.signInCallback.bind(this)}/>
				</div>
			</React.Fragment>
		);
	}
}

export default Home;
