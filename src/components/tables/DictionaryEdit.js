import React, { useState } from 'react';
import useGlobal from '../../store';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import DictionarySelect from '../common/DictionarySelect';
import DictionaryInput from '../common/DictionaryInput';

const DictionariesOverview = () => {
	const [dictionaryItemDomain, setdictionaryItemDomain] = useState('');
	const [dictionaryItemRange, setdictionaryItemRange] = useState('');
	const [globalState, globalActions] = useGlobal();

	const { dictionaries, dictionarySelected } = globalState;
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
				>
					Trash
				</i>
				<i
					className="fa fa-trash"
					onClick={e => editDictionaryItem(cellDictionaryItem)}
				>
					Edit
				</i>
			</div>
		);
	};

	const editDictionaryItem = cellDictionaryName => {
		console.log('edit', cellDictionaryName);
	};
	const addNewDictionaryItem = () => {
		addDictionaryItem(
			dictionaryItemDomain,
			dictionaryItemRange,
			dictionarySelected
		);
	};

	return (
		<div>
			<DictionarySelect
				dictionarySelected={dictionarySelected}
				onChangeSelect={selectDictionary}
				dictionaries={dictionaries}
			/>
			<ReactTable
				data={dictionaries.map(({ items }) => items)}
				className={'cell-center-vertical -striped -highlight'}
				columns={dictionariesTableColumns}
				filterable
				pageSize={Math.ceil(dictionaries.length / 5) * 5}
			/>
			<DictionaryInput
				value={dictionaryItemDomain}
				placeholder="Domain"
				onChange={setdictionaryItemDomain}
			/>
			<DictionaryInput
				value={dictionaryItemRange}
				placeholder="Range"
				onChange={setdictionaryItemRange}
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
