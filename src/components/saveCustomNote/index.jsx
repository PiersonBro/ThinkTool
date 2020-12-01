/** @format */

import React from "react";
import chunk from 'lodash/chunk';
import styles from "../home/styles.css";

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
		// const [id] = useState(_uniqueId('prefix-'));
		return (
			<React.Fragment>
				<div className="noteblock">
					<label>title</label>
					<input
						type='text'
						onChange={(event) => this.SaveTitle(event.target.value)}
					/>
					<label>text</label>
					{/* <input
						type='text'
						onChange={(event) => this.SaveText(event.target.value)}
					/> */}
					<textarea id={this.props.noteID} onChange={(event) => this.SaveText(event.target.value)} cols="40" rows="10"> </textarea>
					<button onClick={this.SaveNote}>Save Custom Note</button>
				</div>
			</React.Fragment>
		);
	}
}

export default SaveCustomNote;
