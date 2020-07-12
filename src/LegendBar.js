import React from "react";
import "./LegendBar.css";

class LegendBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<>
				<strong className="legend-circle-wrapper">Column Colors Legend:</strong>
				<span className="legend-circle-wrapper">
					Good:
					<div className="legend-circle bggreen"></div>
				</span>
				<span className="legend-circle-wrapper">
					Moderate:
					<div className="legend-circle bgyellow"></div>
				</span>
				<span className="legend-circle-wrapper">
					Not Good:
					<div className="legend-circle bgred"></div>
				</span>
				<span className="legend-circle-wrapper">
					No Tasks:
					<div className="legend-circle bggray"></div>
				</span>
			</>
		);
	}
}

export default LegendBar;
