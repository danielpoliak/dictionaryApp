import React, { useState } from 'react';
import useGlobal from '../../store';
import { findDuplicateDictionary } from '../../utils';
import DictionaryTable from '../common/DictionaryTable';
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
			Cell: cell => (
				<div>{cell.original.items && cell.original.items.length}</div>
			),
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
		if (isDuplicate) {
			return;
		} else {
			addDictionary(dictionaryName);
		}
		setDictionaryName('');
	};

	return (
		<div>
			<DictionaryTable
				data={dictionaries}
				columns={dictionariesTableColumns}
				inputFirstValue={dictionaryName}
				inputFirstPlaceholder={'Name'}
				formTitle={'Add new dictionary'}
				inputFirstHandleOnKeyPress={handleOnKeyPress}
				inputFirstOnChange={setDictionaryName}
				btnOnClick={addNewDictionary}
			/>
		</div>
	);
};

export default withErrorHandler(DictionariesOverview);
