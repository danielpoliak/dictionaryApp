import React from 'react';
import './styles/main.scss';
import DictionaryBoards from './components/DictionaryBoards';
import Subview from './components/common/Subview';

const App = () => (
	<div className="body">
		<Subview />
		<DictionaryBoards />
	</div>
);

export default App;
