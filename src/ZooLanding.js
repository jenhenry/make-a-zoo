import React from 'react';
import { Link } from 'react-router-dom';
import MiniZoo from './MiniZoo';
import $ from 'jquery';
import './styles/ZooLandingStyles.css';

class ZooLanding extends React.Component {
	constructor(props) {
		super(props);
		this.state = { to_delete: '' };
		this.generateMiniZoos = this.generateMiniZoos.bind(this);
		this.goToZoo = this.goToZoo.bind(this);
		this.deleteZoo = this.deleteZoo.bind(this);
		this.deleteDialog = this.deleteDialog.bind(this);
	}

	deleteZoo() {
		this.props.deleteZoo(this.state.to_delete);
	}
	deleteDialog(id) {
		this.setState({ to_delete: id });
		$('#deleteDialog').modal('toggle');
	}
	goToZoo(id) {
		this.props.history.push(`/zoo/${id}`);
	}
	generateMiniZoos() {
		return this.props.zoos.map((val) => (
			<MiniZoo info={val} key={val.id} id={val.id} goToZoo={this.goToZoo} deleteDialog={this.deleteDialog} />
		));
	}

	render() {
		return (
			<div className="ZooLanding">
				<header>
					<h1>Welcome To Make-A-Zoo!</h1>
					<Link to="/zoo/new" className="btn btn-info my-2">
						<i className="fas fa-plus pr-1" /> New Zoo
					</Link>
				</header>
				<div className="mini-zoo-list">{this.generateMiniZoos()}</div>

				<div
					className="modal fade"
					id="deleteDialog"
					tabIndex="-1"
					role="dialog"
					aria-labelledby="deleteDialogTitle"
					aria-hidden="true"
				>
					<div className="modal-dialog modal-dialog-centered" role="document">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title" id="deleteDialogTitle">
									Delete Zoo
								</h5>
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div className="modal-body">Are you sure you want to delete this zoo?</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-outline-secondary" data-dismiss="modal">
									Cancel
								</button>
								<button
									type="button"
									className="btn btn-info"
									onClick={this.deleteZoo}
									data-dismiss="modal"
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ZooLanding;
