import React from 'react';

const DictionaryInput = props => {
	const { value, onChange, placeholder } = props;

	return (
		<div className="input-controls">
			<input
				type="text"
				className="form-control"
				value={value}
				placeholder={placeholder}
				onChange={e => onChange(e.target.value)}
			/>
		</div>
	);
};

export default DictionaryInput;
