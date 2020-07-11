import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import { getColumn } from "./Data.js";
import Column from "./Column.js";
import LegendBar from "./LegendBar.js";
import AddTaskPopup from "./AddTaskPopup.js";
import AddColumnPopup from "./AddColumnPopup.js";
import "./Board.css";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			columns: getColumn(),
			addingTask: false,
			addingColumn: false,
		};
	}

	onDragEnd = result => {
		if (!result.destination) return;

		let { columns } = this.state;
		const { source, destination } = result;

		if (source.droppableId !== destination.droppableId) {
			const sourceCol = columns[source.droppableId];
			const destCol = columns[destination.droppableId];

			const sourceItems = [...sourceCol.items];
			const destItems = [...destCol.items];

			const [removed] = sourceItems.splice(source.index, 1);
			destItems.splice(destination.index, 0, removed);

			columns = {
				...columns,
				[source.droppableId]: {
					...sourceCol,
					items: sourceItems,
				},
				[destination.droppableId]: {
					...destCol,
					items: destItems,
				},
			};
			this.setState({
				columns: columns,
			});
		} else {
			const column = this.state.columns[source.droppableId];
			const copiedItems = [...column.items];

			const [removed] = copiedItems.splice(source.index, 1);
			copiedItems.splice(destination.index, 0, removed);

			columns = {
				...columns,
				[source.droppableId]: { ...column, items: copiedItems },
			};
			this.setState({
				columns: columns,
			});
		}
	};

	AddTask = () => {
		if (this.state.addingColumn) {
			this.setState({ addingColumn: !this.state.addingColumn });
		}
		this.setState({ addingTask: !this.state.addingTask });
	};

	AddColumn = () => {
		if (this.state.addingTask) {
			this.setState({ addingTask: !this.state.addingTask });
		}

		this.setState({ addingColumn: !this.state.addingColumn });
	};

	InsertTask = value => {
		const { columns } = this.state;
		if (value.content !== "") {
			if (Object.keys(columns).length !== 0) {
				Object.entries(columns)[0][1].items.unshift(value);
				console.log(columns);
				this.setState({ columns: columns, addingTask: false });
			} else {
				window.alert("Please Add a Column before adding a Task");
				this.setState({ addingTask: false });
			}
		} else {
			alert("Task name cannot be blank");
			this.setState({ addingTask: false });
		}
	};

	InsertColumn = value => {
		let { columns } = this.state;
		if (value !== "") {
			columns = {
				[uuid()]: { title: value, items: [] },
				...columns,
			};
			this.setState({ columns: columns, addingColumn: false });
		} else {
			alert("Column name cannot be blank");
			this.setState({ addingColumn: false });
		}
	};

	deleteColumn = column => {
		let { columns } = this.state;
		Object.keys(columns).forEach(key =>
			columns[key] === column ? delete columns[key] : {}
		);
		this.setState({ columns: columns });
	};

	deleteTask = (taskindex, columnindex) => {
		let { columns } = this.state;

		Object.entries(columns)[columnindex][1].items.splice(taskindex, 1);
		this.setState({ columns: columns });
	};

	deleteColumnHandle = (__, column, noOfItems) => {
		let confirmation;
		if (noOfItems === 0) {
			confirmation = window.confirm(
				`Are you sure you want to delete ${column.title} column?`
			);
		} else {
			confirmation = window.confirm(
				`Deleting the ${column.title} column will result in deletion of all tasks in it!\nAre you sure?`
			);
		}
		if (confirmation) {
			this.deleteColumn(column);
		}
	};

	deleteTaskHandle = (__, taskindex, columnindex) => {
		this.deleteTask(taskindex, columnindex);
	};

	render() {
		const { columns } = this.state;
		let TotalNoOfTasks = 0;
		Object.entries(columns).map(column => {
			return (TotalNoOfTasks += column[1].items.length);
		});
		return (
			<>
				<div className="buttons-wrapper">
					<button className="add-task-button" onClick={this.AddTask}>
						Add Task
					</button>
					<button className="add-column-button" onClick={this.AddColumn}>
						Add Column
					</button>
				</div>

				<div className="outer-container">
					<div>
						{this.state.addingTask && (
							<AddTaskPopup InsertTask={this.InsertTask}></AddTaskPopup>
						)}
						{this.state.addingColumn && (
							<AddColumnPopup InsertColumn={this.InsertColumn}></AddColumnPopup>
						)}
					</div>

					<DragDropContext onDragEnd={result => this.onDragEnd(result)}>
						{Object.entries(columns).map(([id, column], index) => {
							return (
								<div className="column-wrapper">
									<Column
										id={id}
										column={column}
										index={index}
										deleteColumnHandle={this.deleteColumnHandle}
										deleteTaskHandle={this.deleteTaskHandle}
										TotalNoOfColumns={Object.entries(columns).length}
										TotalNoOfTasks={TotalNoOfTasks}></Column>
								</div>
							);
						})}
					</DragDropContext>
				</div>

				<div className="legend">
					<LegendBar></LegendBar>
				</div>
			</>
		);
	}
}

export default App;
