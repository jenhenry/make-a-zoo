import React from 'react';

function MiniCard(props) {
	return (
		<div
			className="Mini"
			style={{
				backgroundImage: `url(./images/${props.img})`
			}}
		/>
	);
}

export default MiniCard;
