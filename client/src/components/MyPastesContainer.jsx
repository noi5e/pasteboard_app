import React from 'react';
import Auth from '../../modules/Auth.js';
import { Redirect } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import MyPastes from './MyPastes.jsx';
import HTTP from '../../modules/HTTP.js';

class MyPastesContainer extends React.Component {
	constructor(props) {
		super(props);

		const storedMessage = localStorage.getItem('successMessage');
		let successMessage = '';

		if (storedMessage) {
			successMessage = storedMessage;
			localStorage.removeItem('successMessage');
		}

		this.state = {
			successMessage,
			pastes: [],
			isLoaded: false
		}
	}

	componentDidMount() {

		HTTP.makeRequest(null, 'get', '/user/get_user_pastes', false, (xhr) => {
			if (xhr.status === 200) {
				this.setState({
					isLoaded: true
				})
			} else {
				console.log(xhr.response);
			}
		})
	}

	render() {
		if (!Auth.isUserAuthenticated()) {
			return (
				<Redirect to='/' />
			);
		}
		
		return (
			<div className='col-lg-12'>
				<h2 className='page-header'>My Profile</h2>
				{this.state.isLoaded ? this.state.pastes.length > 0 ? <MyPastes successMessage={this.state.successMessage} /> : 'You don\'t have any pastes. Why not add one?' : 'Loading profile...'}
			</div>
		);
	}
}

export default MyPastesContainer;