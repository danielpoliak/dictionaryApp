import React from 'react';
import globalHook from 'use-global-hook';
import * as actions from '../actions';

const dictionaries = JSON.parse(localStorage.getItem('dictionaries') || '[]');

console.log(dictionaries, '==== dictionaries initials');

const initialState = {
	dictionaries,
	dictionarySelectedName: dictionaries.length ? dictionaries[0].name : ''
};

export default globalHook(React, initialState, actions);
