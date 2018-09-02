import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import AppState from './models/app_state';


// Dep injection
let appState = new AppState();
ReactDOM.render(<App appState={appState} />, document.getElementById('root'));
registerServiceWorker();
