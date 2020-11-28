/** @format */

import React from "react";

class SaveCustomNote extends React.Component {
	// props: {
	// 	databaseref;
	// }

	state = {
		title: "",
		text: "",
	};

	SaveTitle = (title) => {
		this.setState({ title });
	};

	SaveText = (text) => {
		this.setState({ text });
	};

	SaveNote = () => {
		this.props.databaseref.child("abc").set({
			title: this.state.title,
			user_id: "12345",
			content: this.state.text,
			noteID: "12345",
		});
	};

	render() {
		return (
			<React.Fragment>
				<label>title</label>
				<input
					type='text'
					onChange={(event) => this.SaveTitle(event.target.value)}
				/>
				<label>text</label>
				<input
					type='text'
					onChange={(event) => this.SaveText(event.target.value)}
				/>
				<button onClick={this.SaveNote}>Save Custom Note</button>
			</React.Fragment>
		);
	}
}

export default SaveCustomNote;
