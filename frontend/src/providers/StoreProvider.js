import React from 'react';
import { Provider } from 'react-redux';

const StoreProvider = ({ children, store }) => (
  <Provider store={store}>
    {children}
  </Provider>
);

export default StoreProvider;
