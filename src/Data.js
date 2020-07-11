import { v4 as uuid } from "uuid";

export function getColumn() {
	return {
		[uuid()]: {
			title: "Initial State",
			items: getItems(),
		},
		[uuid()]: {
			title: "In Progress",
			items: [],
		},
		[uuid()]: {
			title: "Debugging",
			items: [],
		},
		[uuid()]: {
			title: "Completed",
			items: [],
		},
	};
}

function getItems() {
	return [
		{
			id: uuid(),
			content: "Task 1",
		},
		{
			id: uuid(),
			content: "Task 2",
		},
		{
			id: uuid(),
			content: "Task 3",
		},
		{
			id: uuid(),
			content: "Task 4",
		},
	];
}
