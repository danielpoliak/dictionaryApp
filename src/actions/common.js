export const setDictionaries = (store, dictionaries) => {
	window.localStorage.setItem('dictionaries', JSON.stringify(dictionaries));
	store.setState({ dictionaries });
};

export const setSubview = (store, subviewSelected) => {
	store.setState({ subviewSelected });
};
