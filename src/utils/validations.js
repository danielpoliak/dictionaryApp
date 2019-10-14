// VALIDATIONS
export const validateDictionaryItems = dictionaryItems =>
	dictionaryItems.map((originalItem, indexOriginal) => {
		if (!!checkIsCycle(dictionaryItems, originalItem, indexOriginal))
			return { ...originalItem, validation: 'Cycle' };

		if (!!checkIsChain(dictionaryItems, originalItem, indexOriginal))
			return { ...originalItem, validation: 'Chain' };

		if (!!checkIsDuplicate(dictionaryItems, originalItem, indexOriginal))
			return { ...originalItem, validation: 'Duplicate' };

		if (!!checkIsFork(dictionaryItems, originalItem, indexOriginal))
			return { ...originalItem, validation: 'Fork' };

		return { ...originalItem, validation: 'OK' };
	});

export const checkIsCycle = (dictionaryItems, originalItem, indexOriginal) =>
	dictionaryItems.find(
		(itemToCompare, indexToCompare) =>
			indexOriginal !== indexToCompare &&
			(originalItem.domain === itemToCompare.range &&
				originalItem.range === itemToCompare.domain)
	);

export const checkIsChain = (dictionaryItems, originalItem, indexOriginal) =>
	dictionaryItems.find(
		(itemToCompare, indexToCompare) =>
			indexOriginal !== indexToCompare &&
			originalItem.range === itemToCompare.domain
	);

export const checkIsDuplicate = (
	dictionaryItems,
	originalItem,
	indexOriginal
) =>
	dictionaryItems.find(
		(itemToCompare, indexToCompare) =>
			indexOriginal !== indexToCompare &&
			(originalItem.domain === itemToCompare.domain &&
				originalItem.range !== itemToCompare.range)
	);

export const checkIsFork = (dictionaryItems, originalItem, indexOriginal) =>
	dictionaryItems.find(
		(itemToCompare, indexToCompare) =>
			indexOriginal !== indexToCompare &&
			(originalItem.domain === itemToCompare.domain &&
				originalItem.range !== itemToCompare.range)
	);
