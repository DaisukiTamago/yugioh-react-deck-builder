import React from 'react';
import ReactDOM from 'react-dom';
import store from './Redux/Store'
import {Provider} from 'react-redux'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import './index.css';
import Home from './Home';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider store={store}>
    <DndProvider backend={Backend}>
      <Home/>
    </DndProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
