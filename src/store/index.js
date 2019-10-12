import React from 'react';
import globalHook from 'use-global-hook';
import * as actions from '../actions';

const initialState = {
	dictionaries: JSON.parse(localStorage.getItem('dictionaries') || '[]'),
	dictionarySelected: ''
};

export default globalHook(React, initialState, actions);
