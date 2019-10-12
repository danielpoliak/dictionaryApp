import React, { useState } from 'react';
import useGlobal from '../../store';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import DictionarySelect from '../common/DictionarySelect';
import DictionaryInput from '../common/DictionaryInput';
import {
	getObjValueFromArrByProperty,
	getPageSizeRoundToFive
} from '../../utils';

const DictionariesOverview = () => {
	const [domain, setDomain] = useState('');
	const [range, setRange] = useState('');
	const [globalState, globalActions] = useGlobal();

	const { dictionaries, dictionarySelectedName } = globalState;
	const { selectDictionary } = globalActions.dictionaries;
	const {
		removeDictionaryItem,
		addDictionaryItem
	} = globalActions.dictionaryItem;

	const dictionariesTableColumns = [
		{
			Header: 'Domain',
			accessor: 'domain'
		},
		{
			Header: 'Range',
			accessor: 'range',
			filterable: false
		},
		{
			Header: 'Actions',
			filterable: false,
			Cell: cell => createActionsCell(cell)
		}
	];

	const createActionsCell = cell => {
		const cellDictionaryItem = cell.original && cell.original;
		return (
			<div>
				<i
					className="fa fa-trash"
					onClick={e => removeDictionaryItem(cellDictionaryItem)}
				></i>
				<i
					className="fa fa-trash"
					onClick={e => editDictionaryItem(cellDictionaryItem)}
				></i>
			</div>
		);
	};

	const handleOnKeyPress = e => {
		if (e.which === 13) {
			addNewDictionaryItem();
		}
	};

	const editDictionaryItem = cellDictionaryName => {
		console.log('edit', cellDictionaryName);
	};

	const addNewDictionaryItem = () => {
		if (!domain || !range) return;
		setDomain('');
		setRange('');
		addDictionaryItem({ domain, range });
	};

	const dictionaryItems = getObjValueFromArrByProperty(
		dictionaries,
		'name',
		dictionarySelectedName,
		'items'
	);
	const pageSize = getPageSizeRoundToFive(dictionaryItems.length);

	return (
		<div>
			<DictionarySelect
				dictionarySelected={dictionarySelectedName}
				onChangeSelect={selectDictionary}
				dictionaries={dictionaries}
			/>
			<ReactTable
				data={dictionaryItems}
				className={'cell-center-vertical -striped -highlight'}
				columns={dictionariesTableColumns}
				filterable
				pageSize={pageSize}
			/>
			<DictionaryInput
				value={domain}
				placeholder="Domain"
				onKeyEnterPress={handleOnKeyPress}
				onChange={setDomain}
			/>
			<DictionaryInput
				value={range}
				placeholder="Range"
				onChange={setRange}
				onKeyPress={handleOnKeyPress}
			/>
			<div className="wrapper-block right">
				<button
					type="button"
					className="btn btn-primary"
					onClick={addNewDictionaryItem}
				>
					Add
				</button>
			</div>
		</div>
	);
};

export default DictionariesOverview;
