import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './components/home/Home';

import './styles.css';

const App = () => (
  <BrowserRouter>
    <Route exact path="/" render={() => <Home />} />
  </BrowserRouter>
);

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
