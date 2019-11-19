import React from 'react';
import { findRecord } from './helpers/zooHelpers';
import MenuCard from './MenuCard';

class CategoryList extends React.Component {
	constructor(props) {
		super(props);
		this.state = { category_open: true };
		this.toggleCategory = this.toggleCategory.bind(this);
		this.addAnimal = this.addAnimal.bind(this);
	}
	toggleCategory() {
		let new_state;
		this.state.category_open ? (new_state = false) : (new_state = true);
		this.setState({ category_open: new_state });
	}
	addAnimal(info) {
		this.props.addAnimal(info);
	}
	populateCategory() {
		const { category, cat_animals, used_animals } = this.props;
		const { category_open } = this.state;
		let avail_animals = cat_animals;
		cat_animals.map((val) => {
			let foundAnimal = findRecord('id', val.id, used_animals);
			if (foundAnimal !== null) {
				// animal is being used! filter out of category
				avail_animals = avail_animals.filter((value) => val.id !== value.id);
			}
			return true;
		});
		if (avail_animals.length) {
			// if this category still has avail animals, show and populate category
			return (
				<div className="CategoryList">
					<div className="row no-gutters">
						<div className="col col-11">
							<div className="category-title">{category.replace(/_/g, ' ')}</div>
						</div>
						<div className="col col-1">
							<button
								className="card-detail"
								data-toggle="collapse"
								data-target={`#cat_${category}`}
								aria-expanded="true"
								onClick={this.toggleCategory}
							>
								{category_open ? (
									<i className="fas fa-angle-down" />
								) : (
									<i className="fas fa-angle-up" />
								)}
							</button>
						</div>
					</div>

					<div className="category show" id={`cat_${category}`}>
						{avail_animals.map((val) => {
							return <MenuCard info={val} key={val.id} addAnimal={this.addAnimal} />;
						})}
					</div>
				</div>
			);
		} else {
			return null;
		}
	}

	render() {
		return this.populateCategory();
	}
}

export default CategoryList;
