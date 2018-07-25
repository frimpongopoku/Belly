import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Home from './pages/Home';
import { Provider } from 'react-redux'; 
import { store } from './../redux-setup/store';


if (document.getElementById('home')) {
    ReactDOM.render(
        <Provider store = { store }>
            <Home />
        </Provider >,
    document.getElementById('home'));
}