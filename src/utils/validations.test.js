import * as val from './validations';

const dictionaryItemsMocked = [
	{
		domain: 'Stonegrey',
		range: 'Dark Grey'
	},
	{
		domain: 'Midnight Black',
		range: 'Black'
	},
	{
		domain: 'Midnight Black',
		range: 'Black'
	},
	{
		domain: 'Midnight Black',
		range: 'White'
	},
	{
		domain: 'Mystic Silver',
		range: 'Silver'
	},
	{
		domain: 'Dark Grey',
		range: 'Stonegrey'
	},
	{
		domain: 'Dark Grey',
		range: 'Stonegrey'
	}
];

it('CYCLE: finds for originalItem item if there is another row where domain1 = range2 & range1 = domain2', () => {
	const isCycle = !!val.checkIsCycle(
		dictionaryItemsMocked,
		dictionaryItemsMocked[0],
		0
	);
	const isNotCycle = !!val.checkIsCycle(
		dictionaryItemsMocked,
		dictionaryItemsMocked[1],
		1
	);

	expect(isCycle).toEqual(true);
	expect(isNotCycle).toEqual(false);
});

it('CHAIN: finds for originalItem item if there is another row where range1 = domain2', () => {
	const isChain = !!val.checkIsChain(
		dictionaryItemsMocked,
		dictionaryItemsMocked[0],
		0
	);
	const isNotChain = !!val.checkIsChain(
		dictionaryItemsMocked,
		dictionaryItemsMocked[1],
		1
	);

	expect(isChain).toEqual(true);
	expect(isNotChain).toEqual(false);
});

it('DUPLICATE: finds for originalItem item if there is another row where domain1 = domain2 & range1 = range2', () => {
	const isDuplicate = !!val.checkIsDuplicate(
		dictionaryItemsMocked,
		dictionaryItemsMocked[1],
		1
	);
	const isNotDuplicate = !!val.checkIsDuplicate(
		dictionaryItemsMocked,
		dictionaryItemsMocked[0],
		0
	);

	expect(isDuplicate).toEqual(true);
	expect(isNotDuplicate).toEqual(false);
});

it('FORK: finds for originalItem item if there is another row where domain1 = domain2 & range1 != range2', () => {
	const isFork = !!val.checkIsFork(
		dictionaryItemsMocked,
		dictionaryItemsMocked[3],
		3
	);
	const isNotFork = !!val.checkIsFork(
		dictionaryItemsMocked,
		dictionaryItemsMocked[5],
		5
	);

	expect(isFork).toEqual(true);
	expect(isNotFork).toEqual(false);
});
