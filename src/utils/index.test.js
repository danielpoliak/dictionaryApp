import * as utils from './index';

const dictionariesMocked = [
	{ name: 'name1', items: [] },
	{
		name: 'name2',
		items: [{ domain: 'domainSelected', range: 'rangeSelected' }]
	},
	{ name: 'name3', items: [] },
	{ name: 'name4', items: [] },
	{ name: 'name5', items: [] }
];

const dictionaryItemsMocked = [
	{ domain: 'domain1', range: 'range1' },
	{ domain: 'domain2', range: 'range2' },
	{ domain: 'domain3', range: 'range3' },
	{ domain: 'domain4', range: 'range4' },
	{ domain: 'domain4', range: 'range4' },
	{ domain: 'domain5', range: 'range5' }
];

it('DUPLICATE DICTIONARY: finds duplicate dictionaries based on dictionary name', () => {
	const isDuplicateDictionary = !!utils.findDuplicateDictionary(
		dictionariesMocked,
		'name2'
	);
	const isNotDuplicateDictionary = !!utils.findDuplicateDictionary(
		dictionariesMocked,
		'name6'
	);

	expect(isDuplicateDictionary).toEqual(true);
	expect(isNotDuplicateDictionary).toEqual(false);
});

it('REMOVE DICT ITEM FROM ARRAY', () => {
	const dictItemsArrWithoutItem = utils.removeDictItemFromArray(
		dictionaryItemsMocked,
		dictionaryItemsMocked[2],
		2
	);

	const dictionaryItemsMockedNew = [
		{ domain: 'domain1', range: 'range1' },
		{ domain: 'domain2', range: 'range2' },
		{ domain: 'domain4', range: 'range4' },
		{ domain: 'domain4', range: 'range4' },
		{ domain: 'domain5', range: 'range5' }
	];
	expect(dictItemsArrWithoutItem).toEqual(dictionaryItemsMockedNew);
});

it('Edit dictionary item in array', () => {
	const mockedNewItem = { domain: 'domainCool', range: 'rangeCool' };
	const dictItemsArrChanged = utils.editDictItemInArray(
		dictionaryItemsMocked,
		mockedNewItem,
		1
	);

	expect(dictItemsArrChanged[1]).toEqual(mockedNewItem);
});

it('Add dictionary item to array', () => {
	const mockedNewItem = { domain: 'domainCoolAdded', range: 'rangeCoolAdded' };
	const dictItemsArrNew = utils.addDictItemToArray(
		dictionaryItemsMocked,
		mockedNewItem
	);

	expect(dictItemsArrNew[dictItemsArrNew.length - 1]).toEqual(mockedNewItem);
});

it('Get Dictionary items from dictionary array', () => {
	const itemSelectedMocked = [
		{
			domain: 'domainSelected',
			range: 'rangeSelected'
		}
	];
	const dictItemsByDictNameArr = utils.getDictionaryItemsFromDictionaryArr(
		dictionariesMocked,
		'name2'
	);

	expect(dictItemsByDictNameArr).toEqual(itemSelectedMocked);
});

it('Find dictionary index by dictionary name', () => {
	const dictIndex = utils.findDictIndexByName(dictionariesMocked, 'name2');

	expect(dictIndex).toEqual(1);
});
