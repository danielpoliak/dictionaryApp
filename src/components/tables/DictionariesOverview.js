import React, { useState } from 'react';
import useGlobal from '../../store';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { findDuplicateDictionary, getPageSizeRoundToFive } from '../../utils';
import DictionaryInput from '../common/DictionaryInput';

const DictionariesOverview = () => {
	const [dictionaryName, setDictionaryName] = useState('');
	const [globalState, globalActions] = useGlobal();

	const { dictionaries } = globalState;
	const { removeDictionary, addDictionary } = globalActions.dictionaries;

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
					className="far fa-edit"
					onClick={e => editDictionary(cellDictionaryName)}
				></i>
			</div>
		);
	};

	const editDictionary = cellDictionaryName => {
		console.log('edit', cellDictionaryName);
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
			setDictionaryName('');
			return;
		} else {
			setDictionaryName('');
			addDictionary(dictionaryName);
		}
	};
	const pageSize = getPageSizeRoundToFive(dictionaries.length);
	console.log(pageSize, ' =page sze');

	return (
		<div>
			<ReactTable
				data={dictionaries}
				className={'cell-center-vertical -striped -highlight'}
				columns={dictionariesTableColumns}
				filterable
				pageSize={pageSize}
			/>
			<DictionaryInput
				value={dictionaryName}
				placeholder="Name"
				onKeyPress={handleOnKeyPress}
				onChange={setDictionaryName}
			/>
			<div className="wrapper-block right">
				<button
					type="button"
					className="btn btn-primary"
					onClick={addNewDictionary}
				>
					Add
				</button>
			</div>
		</div>
	);
};

export default DictionariesOverview;
