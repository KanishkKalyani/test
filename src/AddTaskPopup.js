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

	editTask = event => {
		event.preventDefault();

		const { columns, index, columnindex } = this.props;

		if (this.state.task.content !== "") {
			Object.entries(columns)[columnindex][1].items[index] = this.state.task;
		}

		this.props.editTaskHandle(columns);
		this.props.editingdone();
	};

	render() {
		if (!this.props.edit) {
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
						<input type="submit" value="Save" />
						<p>Note: New task will be added as first column's first task.</p>
					</form>
				</div>
			);
		} else {
			const { columns, index, columnindex } = this.props;
			return (
				<div className="AddTaskPopup">
					<form onSubmit={this.editTask}>
						<label>
							Task Name :
							<input
								type="text"
								value={this.state.task.content}
								placeholder="New Task Name..."
								onChange={this.handleAddChange}
							/>
						</label>
						<input type="submit" value="Save" />
						<p>{`This Task's current name is : ${
							Object.entries(columns)[columnindex][1].items[index].content
						}`}</p>
					</form>
				</div>
			);
		}
	}
}

export default AddTaskPopup;
