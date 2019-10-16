import { setDictionaries } from './common';
import {
	addDictItemToArray,
	removeDictItemFromArray,
	editDictItemInArray,
	createNewDictionaries,
	findDictIndexByName
} from '../utils';
import { validateDictionaryItems } from '../utils/validations';

const updateDictionariesWithItem = (
	store,
	dictionaryItem,
	arrMethod,
	index
) => {
	const { dictionaries, dictionarySelectedName } = store.state;
	if (!dictionarySelectedName) return;

	const dictionarySelectedIndex = findDictIndexByName(
		dictionaries,
		dictionarySelectedName
	);
	const { name, items } = dictionaries[dictionarySelectedIndex];

	const dictionaryItemsNew = arrMethod(items, dictionaryItem, index);
	console.log(dictionaryItemsNew, ' ===== dictionaryItemsNew with index');

	const dictionaryItemsValidated = validateDictionaryItems(dictionaryItemsNew);
	const newDictionaries = createNewDictionaries(
		name,
		dictionaryItemsValidated,
		dictionaries,
		dictionarySelectedIndex
	);

	setDictionaries(store, newDictionaries);
};

export const addDictionaryItem = (store, dictionaryItem) => {
	updateDictionariesWithItem(store, dictionaryItem, addDictItemToArray);
};

export const editDictionaryItem = (store, dictionaryItem, index) => {
	updateDictionariesWithItem(store, dictionaryItem, editDictItemInArray, index);
};

export const removeDictionaryItem = (store, dictionaryItem, index) => {
	updateDictionariesWithItem(
		store,
		dictionaryItem,
		removeDictItemFromArray,
		index
	);
};
