import { setDictionaries } from './common';
import { addItemToArray, removeItemFromArray } from '../utils';

const updateDictionariesWithItem = (store, dictionaryItem, arrMethod) => {
	const { dictionaries, dictionarySelectedName } = store.state;
	if (!dictionarySelectedName) return;
	const newDictionaries = dictionaries.map(({ name, items }) =>
		name === dictionarySelectedName
			? { name, items: arrMethod(items, dictionaryItem) }
			: { name, items }
	);
	setDictionaries(store, newDictionaries);
};

export const addDictionaryItem = (store, dictionaryItem) => {
	updateDictionariesWithItem(store, dictionaryItem, addItemToArray);
};

export const removeDictionaryItem = (store, dictionaryItem) => {
	updateDictionariesWithItem(store, dictionaryItem, removeItemFromArray);
};
