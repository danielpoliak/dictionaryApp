export const findDuplicateDictionary = (dictionaries, dictionaryName) => {
	const duplicateDictionary = dictionaries.find(
		({ name }) => name === dictionaryName
	);
	return duplicateDictionary;
};

export const removeDictItemFromArray = (arr, item, itemIndex) =>
	arr.filter(
		({ domain, range }, index) =>
			itemIndex !== index || (item.domain !== domain && item.range !== range)
	);

export const editDictItemInArray = (arr, item, index) =>
	arr.map((originalObj, objIndex) => (index === objIndex ? item : originalObj));

export const addDictItemToArray = (arr, item) => [...arr, item];

export const getDictionaryItemsFromDictionaryArr = (
	arr,
	dictionarySelectedName
) => {
	const dictionarySelected = arr.find(
		({ name }) => name === dictionarySelectedName
	);
	return dictionarySelected ? dictionarySelected.items : [];
};

export const getPageSizeRoundToFive = size => Math.ceil(size / 5) * 5 || 5;

export const createNewDictionaries = (
	name,
	dictionaryItemsValidated,
	dictionaries,
	dictionarySelectedIndex
) => {
	const dictionaryNew = {
		name,
		items: dictionaryItemsValidated
	};

	const newDictionaries = [...dictionaries];
	newDictionaries[dictionarySelectedIndex] = dictionaryNew;
	return newDictionaries;
};

export const findDictIndexByName = (dictionaries, dictionarySelectedName) =>
	dictionaries.findIndex(
		dictionary => dictionary.name === dictionarySelectedName
	);
