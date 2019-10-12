export const findDuplicateDictionary = (dictionaries, dictionaryName) => {
	const duplicateDictionary = dictionaries.find(
		({ name }) => name === dictionaryName
	);
	return duplicateDictionary;
};

export const removeItemFromArray = (arr, item) =>
	arr.filter(
		({ domain, range }) => item.domain !== domain && item.range !== range
	);

export const addItemToArray = (arr, item) => [...arr, item];

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
