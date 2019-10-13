export const findDuplicateDictionary = (dictionaries, dictionaryName) => {
	const duplicateDictionary = dictionaries.find(
		({ name }) => name === dictionaryName
	);
	return duplicateDictionary;
};

export const removeDictItemFromArray = (arr, item) =>
	arr.filter(
		({ domain, range }) => item.domain !== domain && item.range !== range
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

export const getPageSizeRoundToFive = size => Math.ceil(size / 5) * 5;
