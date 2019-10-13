import React, { useState } from 'react';
import useGlobal from '../../store';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { findDuplicateDictionary, getPageSizeRoundToFive } from '../../utils';
import Input from '../common/Input';
import Button from '../common/Button';
import withErrorHandler from '../common/ErrorHandler';

const DictionariesOverview = () => {
	const [dictionaryName, setDictionaryName] = useState('');
	const [globalState, globalActions] = useGlobal();

	const { dictionaries } = globalState;
	const {
		removeDictionary,
		addDictionary,
		selectDictionary
	} = globalActions.dictionaries;

	const dictionariesTableColumns = [
		{
			Header: 'Name',
			accessor: 'name'
		},
		{
			Header: 'Number of items',
			Cell: cell => <div>{cell.original.items.length}</div>,
			filterable: false
		},
		{
			Header: 'Actions',
			filterable: false,
			Cell: cell => createActionsCell(cell)
		}
	];

	const createActionsCell = cell => {
		const cellDictionaryName = cell.original && cell.original.name;
		return (
			<div>
				<i
					className="fa fa-trash"
					onClick={e => removeDictionary(cellDictionaryName)}
				></i>
				<i
					className="fa fa-edit"
					onClick={e => setToEditDictionary(cellDictionaryName)}
				></i>
			</div>
		);
	};

	const setToEditDictionary = cellDictionaryName => {
		globalActions.common.setSubview(1);
		selectDictionary(cellDictionaryName);
	};

	const handleOnKeyPress = e => {
		if (e.which === 13) {
			addNewDictionary();
		}
	};

	const addNewDictionary = () => {
		const isDuplicate = !!findDuplicateDictionary(dictionaries, dictionaryName);
		// TODO show some kind of error message for duplicate name
		if (isDuplicate) {
			return;
		} else {
			addDictionary(dictionaryName);
		}
		setDictionaryName('');
	};
	const pageSize = getPageSizeRoundToFive(dictionaries.length);

	return (
		<div>
			<ReactTable
				data={dictionaries}
				className={'cell-center-vertical -striped -highlight'}
				columns={dictionariesTableColumns}
				filterable
				pageSize={pageSize}
			/>
			<Input
				value={dictionaryName}
				placeholder="Name"
				onKeyPress={handleOnKeyPress}
				onChange={setDictionaryName}
			/>
			<Button title="Add" onClick={addNewDictionary} />
		</div>
	);
};

export default withErrorHandler(DictionariesOverview);
