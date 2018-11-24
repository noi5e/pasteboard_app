import React from 'react';
import { Redirect } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import MyPastesForm from './MyPastesForm.jsx';
import PastesList from './PastesList.jsx';
import Auth from '../../modules/Auth.js';
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
			isLoaded: false,
			pasteForm: {
				imageURL: '',
				description: ''
			}
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {

		const username = encodeURIComponent(Auth.getUsername())
		const formData = `username=${username}`

		HTTP.makeRequest(null, 'get', '/user/get_user_pastes?' + formData, false, (xhr) => {
			if (xhr.status === 200) {
				this.setState({
					pastes: xhr.response.pastes,
					isLoaded: true
				})
			} else {
				console.log(xhr.response);
			}
		})
	}

	handleChange(event) {
		const field = event.target.id;
		const pasteForm = this.state.pasteForm;
		pasteForm[field] = event.target.value;

		this.setState({
			pasteForm: pasteForm
		});
	}

	handleSubmit(event) {
		event.preventDefault();
	}

	render() {
		if (!Auth.isUserAuthenticated()) {
			return (
				<Redirect to='/' />
			);
		}
		
		return (
			<div className='col-lg-12'>
				<h2 className='page-header'>My Pastes</h2>
				<MyPastesForm onChange={this.handleChange} onSubmit={this.handleSubmit} pasteForm={this.state.pasteForm} />
				{this.state.isLoaded ? this.state.pastes.length > 0 ? <PastesList pastes={this.state.pastes} /> : 'You don\'t have any pastes. Why not add one?' : 'Loading profile...'}
			</div>
		);
	}
}

export default MyPastesContainer;