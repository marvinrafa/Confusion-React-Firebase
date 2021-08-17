import React from 'react';
import ReactDOM from 'react-dom';
//Importamos fontawesome y bootstrap social que fueron instalados con npm install
import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
