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

export const getObjValueFromArrByProperty = (
	arr,
	propertyKey,
	propertyValue,
	targetKey
) => {
	const objSelected = arr.find(obj => obj[propertyKey] === propertyValue);

	return objSelected ? objSelected[targetKey] : [];
};

export const getPageSizeRoundToFive = size => Math.ceil(size / 5) * 5;

// export const validateDictionaryItems = dictionaryItem => {
// 	const { domain, range } = dictionaryItem;
// 	if()
// };
