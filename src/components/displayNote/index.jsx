/** @format */

import React from "react";
import firebase from "firebase";

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
				<button onClick={this.GetNote}>Get Note</button>
				<div>title: {this.state.title}</div>
				<div>text: {this.state.text}</div>
			</React.Fragment>
		);
	}
}

export default DisplayNote;
