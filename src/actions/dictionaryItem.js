import { setDictionaries } from './common';
import {
	addDictItemToArray,
	removeDictItemFromArray,
	editDictItemInArray,
	validateDictionaryItems
} from '../utils';

const updateDictionariesWithItem = (
	store,
	dictionaryItem,
	arrMethod,
	index
) => {
	const { dictionaries, dictionarySelectedName } = store.state;
	if (!dictionarySelectedName) return;

	const dictionaryIndex = dictionaries.findIndex(
		dictionary => dictionary.name === dictionarySelectedName
	);
	const { name, items } = dictionaries[dictionaryIndex];

	const dictionaryItems = arrMethod(items, dictionaryItem, index);
	// const dictionaryItemsValidated = validateDictionaryItems(dictionaryItem);

	const dictionaryNew = {
		name,
		items: dictionaryItems
	};

	const newDictionaries = [...dictionaries];
	newDictionaries[dictionaryIndex] = dictionaryNew;

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
