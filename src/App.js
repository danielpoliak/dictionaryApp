import React, { useState } from 'react';
import './styles/main.scss';
import DictionariesOverview from './components/tables/DictionariesOverview';
import DictionaryItemsEdit from './components/tables/DictionaryItemsEdit';
import enums from './utils/enumerables';

const App = () => {
	const [subviewSelected, setSubviewSelected] = useState(0);

	return (
		<div className="body">
			{enums.subviews.map((subview, index) => (
				<p key={index} onClick={e => setSubviewSelected(index)}>
					{subview}
				</p>
			))}
			{subviewSelected === 0 && <DictionariesOverview />}
			{subviewSelected === 1 && <DictionaryItemsEdit />}
		</div>
	);
};

export default App;
