import React, { useState, useEffect } from 'react';
import useGlobal from '../../store';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Select from '../common/Select';
import Input from '../common/Input';
import Button from '../common/Button';
import withErrorHandler from '../common/ErrorHandler';
import {
	getDictionaryItemsFromDictionaryArr,
	getPageSizeRoundToFive
} from '../../utils';

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
		console.log('on change hould not appear, siabed');

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

	const validationsCell = cell => dataUpdates[cell.index][cell.column.id];

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

	const pageSize = getPageSizeRoundToFive(dataUpdates.length);
	return (
		<div>
			<Select
				dictionarySelected={dictionarySelectedName}
				onChangeSelect={selectDictionary}
				dictionaries={dictionaries}
			/>
			<ReactTable
				data={dataUpdates}
				className={'cell-center-vertical -striped -highlight'}
				columns={dictionariesTableColumns}
				filterable
				pageSize={pageSize}
			/>
			<Input
				value={domain}
				placeholder="Domain"
				onKeyEnterPress={handleOnKeyPress}
				onChange={setDomain}
			/>
			<Input
				value={range}
				placeholder="Range"
				onChange={setRange}
				onKeyPress={handleOnKeyPress}
			/>
			<Button title="Add" onClick={addNewDictionaryItem} />
		</div>
	);
};

export default withErrorHandler(DictionariesItemsEdit);
