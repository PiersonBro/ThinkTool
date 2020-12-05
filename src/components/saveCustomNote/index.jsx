/** @format */

import React from "react";
import styles from "./styles.css";

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
				<div className={styles.noteblock}>
					<input
						type='text'
						placeholder='Title'
						onChange={(event) => this.SaveTitle(event.target.value)}
					/>
					<hr />
					<textarea onChange={(event) => this.SaveText(event.target.value)} cols="40" rows="10" placeholder='Text'></textarea>
					<button onClick={this.SaveNote} className={styles.savebutton}>Save Note</button>
				</div>
			</React.Fragment>
		);
	}
}

export default SaveCustomNote;
