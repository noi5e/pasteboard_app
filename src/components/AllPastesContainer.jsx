import React from "react"
import { Alert } from 'react-bootstrap'

import PastesList from './PastesList.jsx'

import Auth from '../modules/Auth.js'
import HTTP from '../modules/HTTP.js'

class AllPastesContainer extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			pastes: [],
			isLoaded: false
		}
	}

	componentDidMount() {
		const userJustLoggedOut = localStorage.getItem('userJustLoggedOut')

		if (userJustLoggedOut === 'true') {
			localStorage.removeItem('userJustLoggedOut')

			this.props.handleLogout()
		}

		HTTP.makeRequest(null, 'get', '/public/get_all_pastes', false, (xhr) => {
			if (xhr.status === 200) {
				this.setState({
					pastes: xhr.response.pastes,
					isLoaded: true
				})
			} else {
				console.log(xhr.response)
			}
		});
	}

	render() {
		return (
			<div className="col-lg-12">
				{this.state.isLoaded ? this.state.pastes.length > 0 ? <PastesList pastes={this.state.pastes} /> : 'No one has uploaded a paste yet. Why not be the first?' : 'Loading...'}
			</div>
		)
	}
}

export default AllPastesContainer