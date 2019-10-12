import React, { useState } from 'react';
import './styles/main.scss';
import DictionariesOverview from './components/tables/DictionariesOverview';
import DictionaryEdit from './components/tables/DictionaryEdit';
import enums from './utils/enumerables';

const App = () => {
	const [subviewSelected, setSubviewSelected] = useState(0);

	return (
		<div>
			{enums.subviews.map((subview, index) => (
				<p key={index} onClick={e => setSubviewSelected(index)}>
					{subview}
				</p>
			))}
			{subviewSelected === 0 && <DictionariesOverview />}
			{subviewSelected === 1 && <DictionaryEdit />}
		</div>
	);
};

export default App;
