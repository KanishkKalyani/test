import React from "react";
import Board from "./Board.js";
import Header from "./Header.js";
import "./App.css";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className="App">
				<div className="header-wrapper">
					<Header></Header>
				</div>
				<div className="board-wrapper">
					<Board></Board>
				</div>
				<div className="footer-wrapper">Footer</div>
			</div>
		);
	}
}

export default App;
