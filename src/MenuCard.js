import React from 'react';

class ZooMenuCard extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = { info_open: false };
		this.toggleDetails = this.toggleDetails.bind(this);
		this.addAnimal = this.addAnimal.bind(this);
	}
	toggleDetails() {
		let new_state;
		this.state.info_open ? (new_state = false) : (new_state = true);
		this.setState({ info_open: new_state });
	}
	addAnimal() {
		this.props.addAnimal(this.props.info);
	}
	render() {
		const { info } = this.props;
		const { info_open } = this.state;
		return (
			<div className="MenuCard">
				<div className="card card-holder">
					<div className="menu-card">
						<div
							className="card"
							style={{
								maxWidth: '540px'
							}}
						>
							<div className="row no-gutters">
								<div className="col-md-4">
									<div
										className="card-img rounded-left"
										style={{
											backgroundImage: `url(../images/${info.img})`
										}}
									/>
								</div>
								<div className="col-md-8">
									<button className="card-add" onClick={this.addAnimal}>
										<i className="fas fa-plus" />
									</button>
									<button
										className="card-detail"
										data-toggle="collapse"
										data-target={`#collapse_${info.id}`}
										aria-expanded="true"
										aria-controls={`collapse_${info.id}`}
										onClick={this.toggleDetails}
									>
										{info_open ? (
											<i className="fas fa-angle-up" />
										) : (
											<i className="fas fa-angle-down" />
										)}
									</button>
									<h5 className="card-title" id={`heading_${info.id}`}>
										{info.common_name}
									</h5>
								</div>
							</div>
						</div>
					</div>
					<div
						id={`collapse_${info.id}`}
						className="collapse animal-detail"
						aria-labelledby={`heading_${info.id}`}
					>
						<div className="card-body">
							<div className="row items">
								<div className="col col-1">
									<i className="fas fa-map-marker-alt" />
								</div>
								<div className="col col-11 pl-2">{info.location}</div>
							</div>
							<div className="row items">
								<div className="col col-1">
									<i className="fas fa-tree" />
								</div>
								<div className="col col-11 pl-2">{info.habitat}</div>
							</div>
							<div className="row items">
								<div className="col col-1">
									<i className="fas fa-utensils" />
								</div>
								<div className="col col-11 pl-2">{info.food}</div>
							</div>
							<div className="row items">
								<div className="col col-1">
									<i className="fas fa-exclamation-triangle " />
								</div>
								<div className="col col-11 pl-2">{info.endangered}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ZooMenuCard;
