import React from 'react';

class ZooCard extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = { show_items: true, show_factoid: false, info: this.props.info };
		this.showFactoid = this.showFactoid.bind(this);
		this.hideFactoid = this.hideFactoid.bind(this);
		this.deleteAnimal = this.deleteAnimal.bind(this);
	}
	showFactoid() {
		this.setState({ show_items: false, show_factoid: true });
	}
	hideFactoid() {
		this.setState({ show_items: true, show_factoid: false });
	}
	deleteAnimal() {
		this.props.deleteAnimal(this.props.info.id);
	}
	render() {
		const { info } = this.state;
		const { show_items, show_factoid } = this.state;
		return (
			<div className="ZooCard rounded shadow-sm" style={{ backgroundImage: `url(../images/${info.img})` }}>
				<div className="overlay text-white rounded">
					<div className="title">{info.common_name}</div>
					<div className={`row items items_${show_items}`}>
						<div className="col col-1">
							<i className="fas fa-map-marker-alt" />
						</div>
						<div className="col col-11 pl-2"> {info.location}</div>
					</div>
					<div className={`row items items_${show_items}`}>
						<div className="col col-1">
							<i className="fas fa-tree" />
						</div>
						<div className="col col-11 pl-2"> {info.habitat}</div>
					</div>
					<div className={`row items items_${show_items}`}>
						<div className="col col-1">
							<i className="fas fa-utensils" />
						</div>
						<div className="col col-11 pl-2"> {info.food}</div>
					</div>
					<div className={`row items items_${show_items}`}>
						<div className="col col-1">
							<i className="fas fa-exclamation-triangle " />
						</div>
						<div className="col col-11 pl-2"> {info.endangered}</div>
					</div>
					<div className={`factoid factoid_${show_factoid}`}>{info.factoid}</div>
					<div className={`card-icon delete-icon items_${show_items}`}>
						<button className="btn btn-link text-white p-0" onClick={this.deleteAnimal}>
							<i className="fas fa-trash-alt" />
						</button>
					</div>
					<div className="card-icon info-icon">
						<i
							className="fas fa-info-circle"
							onMouseOver={this.showFactoid}
							onMouseOut={this.hideFactoid}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default ZooCard;
