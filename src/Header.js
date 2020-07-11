import React from "react";
import "./Header.css";

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<>
				<img src="./Kanban-logo.png" alt="logo" className="kanban-logo-img" />
				<h3>
					KANBAN BOARD<sup>&reg;</sup>
				</h3>
			</>
		);
	}
}

export default Header;
