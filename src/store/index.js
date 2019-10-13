import React from 'react';
import globalHook from 'use-global-hook';
import * as actions from '../actions';

const dictionaries = JSON.parse(localStorage.getItem('dictionaries') || '[]');

const initialState = {
	subviewSelected: 0,
	dictionaries,
	dictionarySelectedName: dictionaries.length ? dictionaries[0].name : ''
};

export default globalHook(React, initialState, actions);
