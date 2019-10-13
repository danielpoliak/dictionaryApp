import { setDictionaries } from './common';
import {
	addDictItemToArray,
	removeDictItemFromArray,
	editDictItemInArray
} from '../utils';

const updateDictionariesWithItem = (
	store,
	dictionaryItem,
	arrMethod,
	index
) => {
	const { dictionaries, dictionarySelectedName } = store.state;
	if (!dictionarySelectedName) return;
	const newDictionaries = dictionaries.map(({ name, items }) =>
		name === dictionarySelectedName
			? { name, items: arrMethod(items, dictionaryItem, index) }
			: { name, items }
	);
	setDictionaries(store, newDictionaries);
};

export const addDictionaryItem = (store, dictionaryItem) => {
	updateDictionariesWithItem(store, dictionaryItem, addDictItemToArray);
};

export const editDictionaryItem = (store, dictionaryItem, index) => {
	updateDictionariesWithItem(store, dictionaryItem, editDictItemInArray, index);
};

export const removeDictionaryItem = (store, dictionaryItem) => {
	updateDictionariesWithItem(store, dictionaryItem, removeDictItemFromArray);
};
