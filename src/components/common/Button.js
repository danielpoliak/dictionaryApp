import React from 'react';

const Button = props => {
	const { onClick, title } = props;

	return (
		<button type="button" className="btn" onClick={onClick}>
			{title}
		</button>
	);
};

export default Button;
