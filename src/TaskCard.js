import React from "react";
import { Draggable } from "react-beautiful-dnd";
import "./TaskCard.css";

class TaskCard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { item, index, columnindex } = this.props;
		return (
			<Draggable key={item.id} draggableId={item.id} index={index}>
				{(provided, cardbody) => {
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
								minHeight: "80px",
								backgroundColor: cardbody.isDragging ? "#263b4a" : "#456c86",
								color: "white",
								...provided.draggableProps.style,
							}}>
							{item.content}

							<img
								src="https://img.icons8.com/flat_round/20/000000/delete-sign.png"
								alt="delete logo"
								className="task-delete-icon"
								onClick={event =>
									this.props.deleteTaskHandle(event, index, columnindex)
								}
							/>
						</div>
					);
				}}
			</Draggable>
		);
	}
}

export default TaskCard;
