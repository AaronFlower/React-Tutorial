import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Hello from './components/StatefulHello'
import { createStore } from 'redux';
import { enthusiasm } from './reducers/index';
import { StoreState } from './types/index'
import { Provider } from 'react-redux';
import { EnthusiasmAction } from './actions';
/* import Hello from './components/Hello' */

const store = createStore<StoreState, EnthusiasmAction, any, any>(
    enthusiasm, {
        enthusiasmLevel: 1,
        languageName: 'TypeScript',
    }
)

ReactDOM.render(
    <Provider store={store}>
        <Hello name="TypeScript" enthusiasmLevel={8} />
    </Provider>,
    document.getElementById('root') as HTMLElement
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
