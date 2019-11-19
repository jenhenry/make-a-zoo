import React from 'react';
import DraggableZooCard from './DraggableZooCard';
import { SortableContainer } from 'react-sortable-hoc';

const FactoryLineup = SortableContainer(({ used_animals, deleteAnimal }) => {
	return (
		<div className="FactoryLineup">
			{used_animals.map((val, i) => (
				<DraggableZooCard info={val} index={i} key={val.id} deleteAnimal={() => deleteAnimal(val.id)} />
			))}
		</div>
	);
});

export default FactoryLineup;
