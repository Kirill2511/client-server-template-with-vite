import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';

export const render = () =>
  renderToString(
    <Provider store={store}>
      <App />
    </Provider>,
  );
