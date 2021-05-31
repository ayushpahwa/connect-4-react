import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react'
import { BrowserRouter } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'


import './index.css';
import App from './components/App/App';

const store = configureStore();
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate
      loading={<div>Loading...</div>}
      persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
