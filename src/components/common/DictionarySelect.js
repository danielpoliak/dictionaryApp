import React from 'react';

const DictionarySelect = props => {
	const { onChangeSelect, dictionarySelectedName, dictionaries } = props;

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
		<select value={dictionarySelectedName} onChange={onDictionarySelectChange}>
			{renderOptions()}
		</select>
	);
};

export default DictionarySelect;
