import setDictionaries from './common';

export const addDictionary = (store, dictionaryName) => {
	console.log(dictionaryName, ' ===addDictionary');

	const newDictionaries = [
		...store.state.dictionaries,
		{
			name: dictionaryName,
			items: []
		}
	];
	setDictionaries(store, newDictionaries);
};

// TODO PUT
// window.localStorage.setItem('dictionaries', JSON.stringify(newDictionaries));
// store.setState({ dictionaries: newDictionaries });
// in module

export const removeDictionary = (store, dictionaryName) => {
	const newDictionaries = store.state.dictionaries.filter(
		({ name }) => dictionaryName !== name
	);
	setDictionaries(store, newDictionaries);
};

export const selectDictionary = (store, dictionaryName) =>
	store.setState({ dictionarySelected: dictionaryName });
