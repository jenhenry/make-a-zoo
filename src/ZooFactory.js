import React from 'react';
import { Link } from 'react-router-dom';
import { arrayMove } from 'react-sortable-hoc';
import uuid from 'uuid/v4';
import FactoryMenu from './FactoryMenu';
import './styles/FactoryStyles.css';
import FactoryLineup from './FactoryLineup';
import { zoo_animals } from './helpers/zoodata';
import { generateZoo, alphabetSort, initialSort, findRecord } from './helpers/zooHelpers';

let save_disabled = true;
let show_tip = 'opacity-hide';

class ZooFactory extends React.Component {
	constructor(props) {
		super(props);
		this.state = { sorted_animals: {}, used_animals: [], zoo_name: '' };
		this.addAnimal = this.addAnimal.bind(this);
		this.deleteAnimal = this.deleteAnimal.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.saveZoo = this.saveZoo.bind(this);
	}
	UNSAFE_componentWillMount() {
		if (this.props.zoo_info !== null) {
			const current_zoo = generateZoo(this.props.zoo_info.animals);
			this.setState({
				used_animals: current_zoo,
				zoo_name: this.props.zoo_info.name
			});
		}
		let abc_animals = zoo_animals.sort(alphabetSort('common_name'));
		const sorted_animals = initialSort(abc_animals);
		this.setState({ sorted_animals: sorted_animals });
	}

	addAnimal(info) {
		const animal_collection = [ ...this.state.used_animals, info ];
		this.setState({ used_animals: animal_collection });
	}
	deleteAnimal(id) {
		const animal_collection = this.state.used_animals.filter((val) => val.id !== id);
		this.setState({ used_animals: animal_collection });
	}
	onSortEnd = ({ oldIndex, newIndex }) => {
		this.setState({
			used_animals: arrayMove(this.state.used_animals, oldIndex, newIndex)
		});
	};
	handleSubmit(e) {
		e.preventDefault();
		this.setState({ zoo_name: e.target.value });
	}
	handleChange(e) {
		e.target.value !== '' ? (save_disabled = false) : (save_disabled = true);
		const zoo_found = findRecord('name', e.target.value, this.props.zoos);
		if (zoo_found !== null) {
			show_tip = 'opacity-show';
			save_disabled = true;
			this.setState({ zoo_name: '' });
		} else {
			show_tip = 'opacity-hide';
			this.setState({ zoo_name: e.target.value });
		}
	}
	saveZoo() {
		const animals = this.state.used_animals.map((val) => val.id);
		this.props.saveZoo({ id: uuid(), name: this.state.zoo_name, animals: animals });
		this.props.history.push('/');
	}
	render() {
		const { sorted_animals, used_animals, zoo_name } = this.state;
		return (
			<section className="ZooFactory">
				<header>
					<h1>Zoo Factory</h1>
					<nav>
						<button className="btn btn-info my-2" data-toggle="modal" data-target="#saveDialog">
							<i className="far fa-save pr-1" /> Save Zoo
						</button>
						<Link to="/" className="btn btn-info my-2">
							<i className="fas fa-caret-left pr-1" /> Go Back
						</Link>
					</nav>
				</header>
				<div className="menu-section rounded-bottom">
					<FactoryMenu
						sorted_animals={sorted_animals}
						used_animals={used_animals}
						addAnimal={this.addAnimal}
					/>
				</div>
				<div className="animal-section rounded-bottom">
					<FactoryLineup
						distance={2}
						axis="xy"
						used_animals={used_animals}
						deleteAnimal={this.deleteAnimal}
						onSortEnd={this.onSortEnd}
						helperClass="DraggableZooCard"
					/>
				</div>
				<div
					className="modal fade"
					id="saveDialog"
					tabIndex="-1"
					role="dialog"
					aria-labelledby="saveDialogTitle"
					aria-hidden="true"
				>
					<div className="modal-dialog modal-dialog-centered" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="saveDialogTitle">
									Save Your Zoo
								</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">
								<form onSubmit={this.handleSubmit}>
									<div className="form-group">
										<label htmlFor="zoo_name">Enter new zoo name</label>
										<input
											type="text"
											className="form-control"
											id="zoo_name"
											value={zoo_name}
											onChange={this.handleChange}
										/>
										<div className={`invalid-feedback ${show_tip}`}>Name already used.</div>
									</div>
								</form>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-outline-secondary" data-dismiss="modal">
									Cancel
								</button>
								<button
									type="button"
									className="btn btn-info"
									onClick={this.saveZoo}
									disabled={save_disabled}
									data-dismiss="modal"
								>
									Save Zoo
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	}
}

export default ZooFactory;
