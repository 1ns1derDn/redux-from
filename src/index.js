import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ProviderReactRedux } from 'react-redux'
import { BrowserRouter as Router } from "react-router-dom";

import App from './components/App'
import store from './store'

ReactDOM.render(
  <ProviderReactRedux store={store}>
    <Router>
      <App />
    </Router>
  </ProviderReactRedux>,
  document.getElementById('root')
);
