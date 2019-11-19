import React from 'react';
import { SortableElement } from 'react-sortable-hoc';

const DraggableZooCard = SortableElement(({ info, deleteAnimal }) => {
	return (
		<div className="DraggableZooCard rounded shadow-sm" style={{ backgroundImage: `url(../images/${info.img})` }}>
			<div className="overlay text-white rounded-top">
				<div className="title rounded-top">{info.common_name}</div>
			</div>
			<div className="card-icon delete-icon">
				<button className="btn btn-link text-white p-0" onClick={() => deleteAnimal(info.id)}>
					<i className="fas fa-trash-alt" />
				</button>
			</div>
		</div>
	);
});

export default DraggableZooCard;
