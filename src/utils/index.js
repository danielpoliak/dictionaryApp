export const findDuplicateDictionary = (dictionaries, dictionaryName) => {
	const duplicateDictionary = dictionaries.find(
		({ name }) => name === dictionaryName
	);
	return duplicateDictionary;
};
