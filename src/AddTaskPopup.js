import React from "react";
import { v4 as uuid } from "uuid";
import "./Popups.css";

class AddTaskPopup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			task: {
				id: uuid(),
				content: "",
			},
		};
	}

	handleAddChange = event => {
		let task = this.state.task;
		task.content = event.target.value;
		this.setState({ task: task });
	};

	handleSubmit = event => {
		event.preventDefault();
		this.props.InsertTask(this.state.task);
	};

	render() {
		return (
			<div className="AddTaskPopup">
				<form onSubmit={this.handleSubmit}>
					<label>
						Task Name :
						<input
							type="text"
							value={this.state.task.content}
							placeholder="Add Task..."
							onChange={this.handleAddChange}
						/>
					</label>
					<input type="submit" value="Add Task" />
					<p>Note: New task will be added as first column's first task.</p>
				</form>
			</div>
		);
	}
}

export default AddTaskPopup;
