import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';

test('render learn react link', () => {
  const { getByText } = render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  );

  expect(getByText(/learn/i)).toBeInTheDocument();
});
