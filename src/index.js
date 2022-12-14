import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { StoreProvider } from './store';
import {RecoilRoot} from 'recoil';
import {  Provider } from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(reducers, compose(applyMiddleware(thunk)))

root.render(
  <Provider store={store} >
    <StoreProvider>
      <RecoilRoot>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RecoilRoot>
    </StoreProvider>
    </Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
