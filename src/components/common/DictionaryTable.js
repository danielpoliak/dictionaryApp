import React from 'react';
import ReactTable from 'react-table';
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
		inputSecondOnChange
		// isError,
		// erroMessage
	} = props;
	// TODO erorrstyle message

	const pageSize = getPageSizeRoundToFive(data.length);
	return (
		<React.Fragment>
			<ReactTable
				data={data}
				className={'cell-center-vertical -striped -highlight'}
				columns={columns}
				filterable
				pageSize={pageSize}
			/>
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
