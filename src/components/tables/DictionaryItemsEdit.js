import React, { useState, useEffect } from 'react';
import useGlobal from '../../store';
import Select from '../common/Select';
import Input from '../common/Input';
import DictionaryTable from '../common/DictionaryTable';
import withErrorHandler from '../common/ErrorHandler';
import { getDictionaryItemsFromDictionaryArr } from '../../utils';

const DictionariesItemsEdit = () => {
	const [globalState, globalActions] = useGlobal();
	const { dictionaries, dictionarySelectedName } = globalState;
	const [dataUpdates, setDataUpdates] = useState([]);
	const [dictionaryItems, setDictionaryItems] = useState([]);

	useEffect(() => {
		const dictionaryItems = getDictionaryItemsFromDictionaryArr(
			dictionaries,
			dictionarySelectedName
		);
		setDataUpdates(dictionaryItems);
		setDictionaryItems(dictionaryItems);
	}, [dictionaries, dictionarySelectedName]);

	const [domain, setDomain] = useState('');
	const [range, setRange] = useState('');

	const { selectDictionary } = globalActions.dictionaries;
	const {
		removeDictionaryItem,
		addDictionaryItem,
		editDictionaryItem
	} = globalActions.dictionaryItem;

	const dictionariesTableColumns = [
		{
			Header: 'Domain',
			accessor: 'domain',
			Cell: cell => dictionaryItemCell(cell)
		},
		{
			Header: 'Range',
			accessor: 'range',
			Cell: cell => dictionaryItemCell(cell)
		},
		{
			Header: 'Actions',
			filterable: false,
			Cell: cell => createActionsCell(cell)
		},
		{
			Header: 'Validations',
			accessor: 'validation',
			Cell: cell => validationsCell(cell)
		}
	];

	const onDictionaryItemChange = (cell, value, isDiscard) => {
		const cellIndex = cell.index;
		const newDataUpdates = [...dataUpdates];
		const newDataUpdatesCell = isDiscard
			? dictionaryItems[cellIndex]
			: {
					...dataUpdates[cellIndex],
					[cell.column.id]: value,
					isUpdated: true
			  };

		newDataUpdates[cellIndex] = newDataUpdatesCell;
		setDataUpdates(newDataUpdates);
	};

	const dictionaryItemCell = cell => {
		const columnId = cell.column.id;
		const value = dataUpdates[cell.index] && dataUpdates[cell.index][columnId];
		const placeholder = cell.original[columnId];
		return (
			<Input
				value={value}
				placeholder={placeholder}
				onKeyEnterPress={handleOnKeyPress}
				onChange={value => onDictionaryItemChange(cell, value)}
			/>
		);
	};

	const validationsCell = cell => {
		const validation =
			dataUpdates[cell.index] && dataUpdates[cell.index][cell.column.id];
		return <div className={`validation ${validation}`}>{validation}</div>;
	};

	const createActionsCell = cell => {
		const cellItem = dataUpdates[cell.index];
		const isUpdated = cellItem.isUpdated;
		return (
			<div>
				<i
					className="fa fa-trash active"
					onClick={e => removeDictionaryItem(cellItem, cell.index)}
				/>
				<i
					className={`fa fa-undo ${isUpdated ? 'active' : 'disabled'}`}
					onClick={e => {
						isUpdated && onDictionaryItemChange(cell, '', true);
					}}
				/>
				<i
					className={`fa fa-check ${isUpdated ? 'active' : 'disabled'}`}
					onClick={e => {
						isUpdated && editDictionaryItem(cellItem, cell.index);
					}}
				/>
			</div>
		);
	};

	const handleOnKeyPress = e => {
		if (e.which === 13) {
			addNewDictionaryItem();
		}
	};

	const addNewDictionaryItem = () => {
		if (!domain || !range) return;
		setDomain('');
		setRange('');
		addDictionaryItem({ domain, range });
	};
	return (
		<div>
			<Select
				dictionarySelected={dictionarySelectedName}
				onChangeSelect={selectDictionary}
				dictionaries={dictionaries}
			/>
			<DictionaryTable
				data={dataUpdates}
				columns={dictionariesTableColumns}
				inputFirstValue={domain}
				inputFirstPlaceholder={'Domain'}
				inputFirstHandleOnKeyPress={handleOnKeyPress}
				inputFirstOnChange={setDomain}
				btnOnClick={addNewDictionaryItem}
				inputSecondValue={range}
				inputSecondPlaceholder={'Range'}
				inputSecondHandleOnKeyPress={handleOnKeyPress}
				inputSecondOnChange={setRange}
			/>
		</div>
	);
};

export default withErrorHandler(DictionariesItemsEdit);
