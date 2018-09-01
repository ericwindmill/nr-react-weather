import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import AppState from './models/app_state';


let appState = new AppState();
ReactDOM.render(<App state={appState} />, document.getElementById('root'));
registerServiceWorker();
