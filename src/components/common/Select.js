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
		<select value={dictionarySelected} onChange={onDictionarySelectChange}>
			{renderOptions()}
		</select>
	);
};

export default Select;
