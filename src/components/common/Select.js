import React from 'react';

const Select = props => {
	const { onChangeSelect, dictionarySelected, dictionaries } = props;

	const renderOptions = () => {
		const optionsArray = dictionaries.map(({ name }, index) => (
			<option key={index} value={name}>
				{name}
			</option>
		));

		return optionsArray;
	};
	const onDictionarySelectChange = e => onChangeSelect(e.target.value);

	return (
		<div>
			<h4 className="select-title">Select dictionary</h4>
			<select
				className="select-edit"
				value={dictionarySelected}
				onChange={onDictionarySelectChange}
			>
				{renderOptions()}
			</select>
		</div>
	);
};

export default Select;
