import React from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard.js";
import "./Column.css";

class Column extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		const { id, column, TotalNoOfTasks, index, TotalNoOfColumns } = this.props;
		const noOfItems = column.items.length;
		let heading = `${index + 1}. ${column.title}`;
		return (
			<>
				<h2 className="column-header">
					{heading}
					<img
						onClick={event =>
							this.props.deleteColumnHandle(event, column, noOfItems)
						}
						src="https://img.icons8.com/fluent/24/000000/filled-trash.png"
						alt="delete icon"
						className="column-delete-icon"
					/>
				</h2>
				<div className="column">
					<Droppable droppableId={id} key={id}>
						{(provided, cardbody) => {
							return (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}
									style={{
										background:
											TotalNoOfTasks === 0
												? "lightgray"
												: index !== TotalNoOfColumns - 1
												? cardbody.isDraggingOver
													? "lightblue"
													: noOfItems > TotalNoOfTasks / 2 + 1
													? "rgba(255, 0, 0, 0.5)"
													: noOfItems >= TotalNoOfTasks / 2 &&
													  noOfItems <= TotalNoOfTasks / 2 + 1
													? "rgba(255, 247, 0, 0.4)"
													: noOfItems === 0
													? "lightgray"
													: "rgba(21, 255, 0, 0.4)"
												: cardbody.isDraggingOver
												? "lightblue"
												: noOfItems > TotalNoOfTasks / 2 + 1
												? "rgba(21, 255, 0, 0.4)"
												: noOfItems >= TotalNoOfTasks / 2 &&
												  noOfItems <= TotalNoOfTasks / 2 + 1
												? "rgba(255, 247, 0, 0.4)"
												: noOfItems === 0
												? "lightgray"
												: "rgba(255, 0, 0, 0.5)",

										padding: 5,
										width: 250,
										height: "80%",
										overflowY: "auto",
									}}>
									{column.items.map((item, index) => {
										return (
											<TaskCard
												item={item}
												index={index}
												columnindex={this.props.index}
												deleteTaskHandle={
													this.props.deleteTaskHandle
												}></TaskCard>
										);
									})}
									{provided.placeholder}
								</div>
							);
						}}
					</Droppable>
				</div>
			</>
		);
	}
}

export default Column;
