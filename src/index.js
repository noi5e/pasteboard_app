import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'

import Main from './components/Main.jsx'

class App extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Route path='/' component={Main} />
			</BrowserRouter>
		)
	}
}

ReactDOM.render(
	<App />,
	document.getElementById('root')
)