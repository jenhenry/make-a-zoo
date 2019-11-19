import React from 'react';
import CategoryList from './CategoryList';
import { filterSort } from './helpers/zooHelpers';
import { zoo_animals } from './helpers/zoodata';

class FactoryMenu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sorted_animals: this.props.sorted_animals
		};
		this.addAnimal = this.addAnimal.bind(this);
		this.sortChange = this.sortChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.generateZooMenu = this.generateZooMenu.bind(this);
	}
	handleSubmit(e) {
		e.preventPropagation();
	}
	sortChange(e) {
		if (e.target.value !== '0') {
			const sorted_animals = filterSort(e.target.value, zoo_animals);
			this.setState({ sorted_animals: sorted_animals });
		}
	}
	addAnimal(info) {
		this.props.addAnimal(info);
	}
	generateZooMenu() {
		const setofkeys = Object.keys(this.state.sorted_animals);
		return setofkeys.map((val) => {
			const category = val;

			return (
				<CategoryList
					category={category}
					cat_animals={this.state.sorted_animals[val]}
					used_animals={this.props.used_animals}
					key={category}
					addAnimal={this.addAnimal}
					deleteAnimal={this.deleteAnimal}
				/>
			);
		});
	}
	render() {
		return (
			<div className="FactoryMenu">
				<div className="sort-filter">
					<form onSubmit={this.handleSubmit} onChange={this.sortChange}>
						<div className="form-group">
							<label htmlFor="sort" className="sr-only">
								Sort by...
							</label>
							<select className="form-control" id="sort">
								<option value="0">Sort by...</option>
								<option value="alpha">Alphabetical</option>
								<option value="status">Endangered status</option>
								<option value="type">Animal type</option>
								<option value="location">Location</option>
								<option value="habitat">Habitat</option>
							</select>
						</div>
					</form>
				</div>

				{this.generateZooMenu()}
			</div>
		);
	}
}

export default FactoryMenu;
