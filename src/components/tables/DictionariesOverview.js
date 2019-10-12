import React, { useState } from 'react';
import useGlobal from '../../store';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { findDuplicateDictionary } from '../../utils';
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
			Header: 'Count',
			accessor: 'items',
			Cell: cell => {
				// console.log(cell);
			},
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
		console.log(cell, '==== createActionsCell');
		return (
			<div>
				<i
					className="fa fa-trash"
					onClick={e => removeDictionary(cellDictionaryName)}
				>
					Trash
				</i>
				<i
					className="fa fa-trash"
					onClick={e => editDictionary(cellDictionaryName)}
				>
					Edit
				</i>
			</div>
		);
	};

	const editDictionary = cellDictionaryName => {
		console.log('edit', cellDictionaryName);
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
	console.log(dictionaries, ' ====dictionaries');

	return (
		<div>
			<ReactTable
				data={dictionaries}
				className={'cell-center-vertical -striped -highlight'}
				columns={dictionariesTableColumns}
				filterable
				pageSize={Math.ceil(dictionaries.length / 5) * 5}
			/>
			<DictionaryInput
				value={dictionaryName}
				placeholder="Name"
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
