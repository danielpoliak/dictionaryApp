import React from 'react';

const Input = props => {
	const {
		value,
		onChange,
		placeholder,
		onKeyPress
		// isError,
		// erroMessage
	} = props;
	// TODO erorrstyle message
	return (
		<div className="input-controls">
			<input
				type="text"
				className="form-control"
				value={value}
				onKeyPress={onKeyPress}
				placeholder={placeholder}
				onChange={e => onChange(e.target.value)}
			/>
		</div>
	);
};

export default Input;
