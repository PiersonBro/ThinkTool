/** @format */

import React from "react";
import Note from "../saveCustomNote";
import DisplayNote from "../displayNote";
import SignInFlow from "../signIn/SignInFlow";
import firebase from "firebase"
import styles from "./styles.css";

// Same as Home(const), but a stateful class so that we can add stuff to it?
class Home extends React.Component {

	// Need new notes and displayed notes to be the same class so that we can have an array that contains both saved notes and new notes, and also have the ability to edit saved notes
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
			notes: [...this.state.notes, <Note title={note.title === undefined ? "" : note.title} databaseref={this.databaseref} text={note.content === undefined ? "" : note.content} key ={noteID}/>]
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
		}
	}

	render() {
		return (
			<React.Fragment>
				<div className={styles.main}>
					<div className={styles.title}>ThinkTool</div>
					{this.state.notes}
					<button
						className={styles.addButton}
						onClick={this.loadNotes}
					>Load Notes <br/> in Console</button>
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

// export default Home;
export default Home;
