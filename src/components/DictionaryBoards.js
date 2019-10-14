import React from 'react';
import useGlobal from '../store';
import DictionariesOverview from './views/DictionariesOverview';
import DictionaryItemsEdit from './views/DictionaryItemsEdit';
import withErrorHandler from '../components/common/ErrorHandler';

const DictionaryBoards = () => {
	const [globalState] = useGlobal();
	const { subviewSelected } = globalState;

	return (
		<React.Fragment>
			{subviewSelected === 0 && <DictionariesOverview />}
			{subviewSelected === 1 && <DictionaryItemsEdit />}
		</React.Fragment>
	);
};

export default withErrorHandler(DictionaryBoards);
