// VALIDATIONS
export const validateDictionaryItems = dictionaryItems => {
	dictionaryItems.map((originalItem, indexOriginal) => {
		const isCycle = checkIsCycle(dictionaryItems, originalItem, indexOriginal);
		if (!!isCycle) {
			return { ...originalItem, validation: 'Cycle' };
		}
		const isChain = checkIsChain(dictionaryItems, originalItem, indexOriginal);
		if (!!isChain) {
			return { ...originalItem, validation: 'Chain' };
		}
		const isDuplicate = checkIsDuplicate(
			dictionaryItems,
			originalItem,
			indexOriginal
		);
		if (!!isDuplicate) {
			return { ...originalItem, validation: 'Duplicate' };
		}
		const isFork = checkIsFork(dictionaryItems, originalItem, indexOriginal);
		if (!!isFork) {
			return { ...originalItem, validation: 'Fork' };
		}
		return { ...originalItem, validation: 'OK' };
	});
};

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
