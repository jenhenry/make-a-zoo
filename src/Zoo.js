import React from 'react';
import { Link } from 'react-router-dom';
import ZooCard from './ZooCard';
import { generateZoo } from './helpers/zooHelpers';
import './styles/ZooStyles.css';

class Zoo extends React.Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.populateZoo = this.populateZoo.bind(this);
		this.editZoo = this.editZoo.bind(this);
		this.deleteAnimal = this.deleteAnimal.bind(this);
	}
	handleClick() {
		this.props.history.push('/');
	}
	populateZoo() {
		const cZoo = generateZoo(this.props.info.animals);
		return cZoo.map((val) => <ZooCard info={val} key={val.id} deleteAnimal={this.deleteAnimal} />);
	}
	editZoo() {
		this.props.editZoo(this.props.info);
		this.props.history.push('/zoo/edit');
	}
	deleteAnimal(id) {
		let updated_animals = this.props.info.animals.filter((val) => val !== id);
		const cUpdatedZoo = { id: this.props.info.id, name: this.props.info.name, animals: updated_animals };
		this.props.deleteAnimal(cUpdatedZoo);
	}
	render() {
		const { info } = this.props;
		return (
			<div className="Zoo">
				<header>
					<h1>{info.name}</h1>
					<Link to="/" className="btn btn-info my-2" onClick={this.handleClick}>
						Go Back
					</Link>
				</header>
				<div className="ZooList">
					{this.populateZoo()}
					<div className="ZooCard empty-card rounded-lg" onClick={this.editZoo}>
						<i className="fas fa-edit" />
					</div>
					<div className="ZooCard" />
				</div>
			</div>
		);
	}
}

export default Zoo;
