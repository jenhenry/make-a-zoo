import React from 'react';
import MiniCard from './MiniCard';
import { generateZoo } from './helpers/zooHelpers';

class MiniZoo extends React.Component {
	constructor(props) {
		super(props);
		this.generateCards = this.generateCards.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.deleteClick = this.deleteClick.bind(this);
	}

	deleteClick(e) {
		e.stopPropagation();
		this.props.deleteDialog(this.props.id);
	}
	generateCards() {
		const cCurrentZoo = generateZoo(this.props.info.animals);
		return cCurrentZoo.map((val) => <MiniCard img={val.img} key={val.id} />);
	}

	handleClick() {
		this.props.goToZoo(this.props.id);
	}
	render() {
		return (
			<div className="MiniZoo shadow-sm" onClick={this.handleClick}>
				<div className="mini-animals">{this.generateCards()}</div>
				<div className="mini-title">
					{this.props.info.name}
					<span className="delete">
						<button
							className="btn btn-link text-secondary"
							data-toggle="modal"
							data-target="#deleteDialog"
							onClick={this.deleteClick}
						>
							<i className="fas fa-trash-alt" />
						</button>
					</span>
				</div>
			</div>
		);
	}
}

export default MiniZoo;
