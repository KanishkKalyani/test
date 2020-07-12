import React from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskCard from "./TaskCard.js";
import "./Column.css";
import AddColumnPopup from "./AddColumnPopup.js";

class Column extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			edit: false,
		};
	}

	editColumnHandle = () => {
		this.setState({ edit: true });
	};

	editingdone = () => {
		this.setState({ edit: false });
	};

	render() {
		const {
			id,
			column,
			columns,
			TotalNoOfTasks,
			index,
			TotalNoOfColumns,
		} = this.props;
		const noOfItems = column.items.length;
		let heading = `${index + 1}. ${column.title}`;
		return (
			<>
				{this.state.edit && (
					<AddColumnPopup
						edit={true}
						columns={columns}
						columnindex={index}
						editColumnHandle={this.props.editColumnHandle}
						editingdone={this.editingdone}></AddColumnPopup>
				)}
				<div className="column-header">
					<h2 className="heading">{heading}</h2>
					<span>
						<abbr title="Edit">
							<img
								src="https://img.icons8.com/material/25/000000/edit--v1.png"
								alt="edit icon"
								className="column-edit-icon"
								onClick={this.editColumnHandle}
							/>
						</abbr>
						<abbr title="Delete">
							<img
								src="https://img.icons8.com/fluent/25/000000/filled-trash.png"
								alt="delete icon"
								className="column-delete-icon"
								onClick={event =>
									this.props.deleteColumnHandle(event, column, noOfItems)
								}
							/>
						</abbr>
					</span>
				</div>
				<div className="column">
					<Droppable droppableId={id} key={id}>
						{(provided, snapshot) => {
							return (
								<div
									{...provided.droppableProps}
									ref={provided.innerRef}
									style={{
										background:
											TotalNoOfTasks === 0
												? "lightgray"
												: index !== TotalNoOfColumns - 1
												? snapshot.isDraggingOver
													? "lightblue"
													: noOfItems > TotalNoOfTasks / 2 + 1
													? "rgba(255, 0, 0, 0.5)"
													: noOfItems >= TotalNoOfTasks / 2 &&
													  noOfItems <= TotalNoOfTasks / 2 + 1
													? "rgba(255, 247, 0, 0.4)"
													: noOfItems === 0
													? "lightgray"
													: "rgba(21, 255, 0, 0.4)"
												: snapshot.isDraggingOver
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
										minHeight: "100%",
									}}>
									{column.items.map((item, index) => {
										return (
											<TaskCard
												columns={columns}
												item={item}
												index={index}
												editTaskHandle={this.props.editTaskHandle}
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
