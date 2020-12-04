/** @format */

import React from "react";
import firebase from "firebase";
import styles from "../saveCustomNote/styles.css"

class DisplayNote extends React.Component {
	state = {
		title: "",
		text: "",
	};

	GetNote = () => {
		this.props.databaseref.once("value").then((snapshot) => {
			console.log(snapshot.val().abc);
			const values = snapshot.val().abc;
			this.setState({ title: values.title, text: values.content });
		});
	};

	render() {
		return (
			<React.Fragment>
				<div className={styles.noteblock}>
					<button onClick={this.GetNote}>Get Note</button>
					<div>title: {this.state.title}</div>
					<div>text: {this.state.text}</div>
				</div>
			</React.Fragment>
		);
	}
}

export default DisplayNote;
