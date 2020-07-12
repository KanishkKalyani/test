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

	editColumn = event => {
		event.preventDefault();

		const { columns, columnindex } = this.props;

		if (this.state.title !== "") {
			Object.entries(columns)[columnindex][1].title = this.state.title;
		}
		this.props.editColumnHandle(columns);
		this.props.editingdone();
	};

	render() {
		const { edit } = this.props;
		if (!edit) {
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
						<input type="submit" value="Save" />
						<p>Note: New column will be added as first column.</p>
					</form>
				</div>
			);
		} else {
			const { columns, columnindex } = this.props;
			return (
				<div className="AddColumnPopup">
					<form onSubmit={this.editColumn}>
						<label>
							Column Name:
							<input
								type="text"
								value={this.state.title}
								placeholder="New Column Name..."
								onChange={this.handleAddChange}
							/>
						</label>
						<input type="submit" value="Save" />
						<p>{`This Column's current name is : ${
							Object.entries(columns)[columnindex][1].title
						}`}</p>
					</form>
				</div>
			);
		}
	}
}

export default AddColumnPopup;
