import React from 'react';

const Button = props => {
	const { onClick, title } = props;

	return (
		<div className="wrapper-block right">
			<button type="button" className="btn btn-primary" onClick={onClick}>
				{title}
			</button>
		</div>
	);
};

export default Button;
