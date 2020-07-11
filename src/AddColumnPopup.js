import React from "react";
import "./Popups.css";

class AddColumnPopup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
		};
	}

	handleAddChange = event => {
		this.setState({ title: event.target.value });
	};

	handleSubmit = event => {
		event.preventDefault();
		this.props.InsertColumn(this.state.title);
	};

	render() {
		return (
			<div className="AddColumnPopup">
				<form onSubmit={this.handleSubmit}>
					<label>
						Column Name:
						<input
							type="text"
							value={this.state.title}
							placeholder="Add Task..."
							onChange={this.handleAddChange}
						/>
					</label>
					<input type="submit" value="Add Column" />
					<p>Note: New column will be added as first column.</p>
				</form>
			</div>
		);
	}
}

export default AddColumnPopup;
