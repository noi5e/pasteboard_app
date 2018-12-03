import React from 'react';
import ReactDOM from 'react-dom';
import Auth from '../modules/Auth.js';
import {
  HashRouter as Router,
  Route,
  browserHistory as history
} from 'react-router-dom'

import Main from './components/Main.jsx'

class App extends React.Component {
	render() {
		return (
			<Router browserHistory={history}>
				<Route path="/" component={Main} />
			</Router>
		);
	}
}

ReactDOM.render(
	(<App />), document.getElementById('root'));