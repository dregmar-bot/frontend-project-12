import React from 'react';
import { Provider } from 'react-redux';
import store from '../slices/index.js'


const StoreProvider = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
);

export default StoreProvider;
