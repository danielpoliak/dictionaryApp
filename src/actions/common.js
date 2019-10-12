export const setDictionaries = (store, dictionaries) => {
	window.localStorage.setItem('dictionaries', JSON.stringify(dictionaries));
	store.setState({ dictionaries });
};
