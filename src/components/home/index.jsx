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

	addNotes = (note) => {
		var noteID; 
		if (note.noteID !== undefined) {
			noteID = note.noteID;
		} else {
			noteID = Math.floor(Math.random() * Math.floor(1000)) + firebase.auth().currentUser.uid;
		}
		this.setState({
			notes: [...this.state.notes, <Note title={note.title === undefined ? "" : note.title} databaseref={this.databaseref} text={note.content === undefined ? "" : note.content} key ={noteID} noteID = {noteID} relatedNotes={note.relatedNotes} width = {note.width} height = {note.height} posX = {note.posX} posY = {note.posY} />]
		})
	}

	loadNotes = () => {
		//Do we need to update state here?
		// ref.on("child_added", function(snap) {
		// 	  count++;
		// 	  console.log("added:", snap.key);
		// 	});	
		var home = this;		
		this.databaseref.once("value").then(function (snapshot) {
			Object.values(snapshot.val()).forEach((value) => {
				 home.addNotes(value);
			})
		});
	}

	signInCallback = () => {
		if (this.databaseref === undefined) {
			var database = firebase.database();
			this.databaseref = database.ref(firebase.auth().currentUser.uid.toString()+"/note");
			this.loadNotes();
		}
	}

	render() {
		return (
			<React.Fragment>
				<div className={styles.main}>
					<div className={styles.title}>ThinkTool</div>
					{this.databaseref === undefined ? <h3>loading...</h3> : this.state.notes}
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
