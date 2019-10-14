import React from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from './Button';
import Input from './Input';
import { getPageSizeRoundToFive } from '../../utils';

const DictionaryTable = props => {
	const {
		data,
		columns,
		inputFirstValue,
		inputFirstPlaceholder,
		inputFirstHandleOnKeyPress,
		inputFirstOnChange,
		btnOnClick,
		btnTitle = 'Add',
		inputSecondValue,
		inputSecondPlaceholder,
		inputSecondHandleOnKeyPress,
		inputSecondOnChange,
		formTitle
	} = props;

	const pageSize = getPageSizeRoundToFive(data.length);
	return (
		<React.Fragment>
			<ReactTable
				data={data}
				className={'cell-center-vertical -striped -highlight'}
				columns={columns}
				filterable
				defaultPageSize={pageSize}
			/>
			<h4 className="form-title">{formTitle}</h4>
			<div className="form-bottom">
				<Input
					value={inputFirstValue}
					placeholder={inputFirstPlaceholder}
					onKeyPress={inputFirstHandleOnKeyPress}
					onChange={inputFirstOnChange}
				/>
				{!!inputSecondOnChange && (
					<Input
						value={inputSecondValue}
						placeholder={inputSecondPlaceholder}
						onKeyPress={inputSecondHandleOnKeyPress}
						onChange={inputSecondOnChange}
					/>
				)}
				<Button title={btnTitle} onClick={btnOnClick} />
			</div>
		</React.Fragment>
	);
};

export default DictionaryTable;
