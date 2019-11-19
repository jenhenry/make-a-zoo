import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Zoo from './Zoo';
import ZooFactory from './ZooFactory';
import ZooLanding from './ZooLanding';
import { findRecord } from './helpers/zooHelpers';
import { preset_zoos } from './helpers/zoodata';

class App extends React.Component {
	constructor(props) {
		super(props);
		const savedZoos = JSON.parse(window.localStorage.getItem('zoos'));
		this.state = { zoos: savedZoos || preset_zoos, zoo_to_edit: null };
		this.saveZoo = this.saveZoo.bind(this);
		this.editZoo = this.editZoo.bind(this);
		this.deleteZoo = this.deleteZoo.bind(this);
		this.deleteAnimal = this.deleteAnimal.bind(this);
	}
	saveZoo(zoo) {
		let updated_zoos = [ ...this.state.zoos, zoo ];
		this.setState(
			(st) => ({
				zoos: updated_zoos
			}),
			() => {
				window.localStorage.setItem('zoos', JSON.stringify(updated_zoos));
			}
		);
	}
	deleteZoo(id) {
		this.setState(
			(st) => ({ zoos: st.zoos.filter((val) => val.id !== id) }),
			() => {
				window.localStorage.setItem('zoos', JSON.stringify(this.state.zoos));
			}
		);
	}
	editZoo(zoo) {
		this.setState({ zoo_to_edit: zoo });
	}
	deleteAnimal(updated_zoo) {
		let zoos = this.state.zoos;
		for (let i = 0; i < zoos.length; i++) {
			if (zoos[i].id === updated_zoo.id) {
				zoos[i].animals = updated_zoo.animals;
			}
		}
		this.setState(
			(st) => ({ zoos: zoos }),
			() => {
				window.localStorage.setItem('zoos', JSON.stringify(this.state.zoos));
			}
		);
	}
	render() {
		const { zoos, zoo_to_edit } = this.state;
		return (
			<div className="App">
				<Switch>
					<Route
						exact
						path="/zoo/edit"
						render={(routeProps) => (
							<ZooFactory zoos={zoos} saveZoo={this.saveZoo} zoo_info={zoo_to_edit} {...routeProps} />
						)}
					/>
					<Route
						exact
						path="/zoo/new"
						render={(routeProps) => (
							<ZooFactory zoos={zoos} saveZoo={this.saveZoo} zoo_info={null} {...routeProps} />
						)}
					/>
					<Route
						exact
						path="/zoo/:id"
						render={(routeProps) => (
							<Zoo
								info={findRecord('id', routeProps.match.params.id, zoos)}
								editZoo={this.editZoo}
								deleteAnimal={this.deleteAnimal}
								{...routeProps}
							/>
						)}
					/>
					<Route
						exact
						path="/"
						render={(routeProps) => <ZooLanding zoos={zoos} deleteZoo={this.deleteZoo} {...routeProps} />}
					/>
					<Route
						render={(routeProps) => <ZooLanding zoos={zoos} deleteZoo={this.deleteZoo} {...routeProps} />}
					/>
				</Switch>
			</div>
		);
	}
}

export default App;
