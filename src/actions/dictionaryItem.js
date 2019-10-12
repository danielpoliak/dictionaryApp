import setDictionaries from './common';

export const addDictionaryItem = (store, domain, range, dictionarySelected) => {
	const { dictionaries } = store.state;

	const newDictionaries = dictionaries.map(({ name, items }) =>
		name === dictionarySelected
			? { name, items: items.push({ domain, range }) }
			: { name, items }
	);

	setDictionaries(store, newDictionaries);
};

export const removeDictionaryItem = (store, dictionaryName) => {
	const newDictionaries = store.state.dictionaries.filter(
		({ name }) => dictionaryName !== name
	);
	setDictionaries(store, newDictionaries);
};

// export const selectDictionary = (store, dictionaryName) =>
// 	store.setState({ dictionarySelected: dictionaryName });
