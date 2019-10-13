import { setDictionaries } from './common';

export const addDictionary = (store, dictionaryName) => {
	const { dictionaries } = store.state;

	const newDictionaries = [
		...dictionaries,
		{
			name: dictionaryName,
			items: []
		}
	];
	setDictionaries(store, newDictionaries);
};

export const removeDictionary = (store, dictionaryName) => {
	const { dictionaries } = store.state;

	const newDictionaries = dictionaries.filter(
		({ name }) => dictionaryName !== name
	);
	setDictionaries(store, newDictionaries);
};

export const selectDictionary = (store, dictionaryName) => {
	const { dictionaries } = store.state;

	const dictionarySelected = dictionaries.find(
		({ name }) => name === dictionaryName
	);
	console.log(dictionaryName, ' ===== dictionaryName');
	if (!dictionarySelected) return;

	store.setState({ dictionarySelectedName: dictionaryName });
};
