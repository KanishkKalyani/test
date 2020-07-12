import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "./TaskCard.css";
import AddTaskPopup from "./AddTaskPopup";

class TaskCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: false,
		};
	}

	editTaskHandle = () => {
		this.setState({ edit: true });
	};

	editingdone = () => {
		this.setState({ edit: false });
	};

	render() {
		const { columns, item, index, columnindex } = this.props;
		return (
			<>
				{this.state.edit && (
					<AddTaskPopup
						edit={true}
						columns={columns}
						index={index}
						columnindex={columnindex}
						editTaskHandle={this.props.editTaskHandle}
						editingdone={this.editingdone}></AddTaskPopup>
				)}
				<Draggable key={item.id} draggableId={item.id} index={index}>
					{(provided, snapshot) => {
						return (
							<div
								ref={provided.innerRef}
								{...provided.draggableProps}
								{...provided.dragHandleProps}
								style={{
									userSelect: "none",
									position: "relative",
									padding: "10px",
									marginBottom: "10px",
									height: "80px",
									overflowY: "auto",
									textTransform: "capitalize",
									backgroundColor: snapshot.isDragging ? "#263b4a" : "#456c86",
									color: "white",
									...provided.draggableProps.style,
								}}>
								{item.content}

								<abbr title="Delete">
									<img
										src="https://img.icons8.com/flat_round/20/000000/delete-sign.png"
										alt="delete logo"
										className="task-delete-icon"
										onClick={event =>
											this.props.deleteTaskHandle(event, index, columnindex)
										}
									/>
								</abbr>
								<abbr title="Edit">
									<img
										src="https://img.icons8.com/material-sharp/22/000000/edit.png"
										alt="edit logo"
										className="task-edit-icon"
										onClick={event =>
											this.editTaskHandle(event, index, columnindex)
										}
									/>
								</abbr>
							</div>
						);
					}}
				</Draggable>
			</>
		);
	}
}

export default TaskCard;
