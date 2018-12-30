import React from 'react'
import { Alert } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faSearchPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// library.add(faTrashAlt)

import MyPastesForm from './MyPastesForm.jsx'
import MyPastesList from './MyPastesList.jsx'

import Auth from '../modules/Auth.js'
import HTTP from '../modules/HTTP.js'

class MyPastesContainer extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			successMessage: '',
			pastes: [],
			isLoaded: false,
			pasteForm: {
				imageURL: '',
				description: ''
			}
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handlePasteDelete = this.handlePasteDelete.bind(this);
	}

	componentDidMount() {
		const username = encodeURIComponent(Auth.getUsername())
		const formData = `username=${username}`

		HTTP.makeRequest(null, 'get', '/public/get_user_pastes?' + formData, false, (xhr) => {
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

	handlePasteDelete(event) {
		event.preventDefault();

		console.log(event.target.id)

		const pasteID = encodeURIComponent(event.target.id);
		const formData = `pasteID=${pasteID}`;

		HTTP.makeRequest(formData, 'post', '/api/remove_paste', true, (xhr) => {
			if (xhr.status === 200) {
				console.log(xhr.response);

				this.setState({
					pastes: xhr.response.pastes,
					successMessage: xhr.response.successMessage
				});
			} else {
				console.log(xhr.response);
			}
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		const imageURL = encodeURIComponent(this.state.pasteForm.imageURL);
		const description = encodeURIComponent(this.state.pasteForm.description);
		const formData = `imageURL=${imageURL}&description=${description}`;

		HTTP.makeRequest(formData, 'post', '/api/add_new_paste', true, (xhr) => {
			if (xhr.status === 200) {
				console.log(xhr.response.pastes)

				this.setState({
					pastes: xhr.response.pastes,
					successMessage: xhr.response.message,
					pasteForm: {
						imageURL: '',
						description: ''
					}
				})
			} else {
				console.log(xhr.response);
			}
		});
	}

	render() {
		if (!Auth.isUserAuthenticated()) {
			return (
				<Redirect to='/' />
			);
		}

		let pastes = "";

		if (this.state.isLoaded) {
			if (this.state.pastes.length > 0) {
				pastes = <div><h3 className='page-header'>Your Pastes</h3><MyPastesList pastes={this.state.pastes} handlePasteDelete={(e) => this.handlePasteDelete(e)} usersOwnPaste={true} /></div>
			} else {
				pastes = "You don\'t have any pastes. Why not add one?"
			}
		} else {
			pastes = "Loading profile...";
		}

		// if (this.state.isLoaded) {
		// 	pastes = this.state.pastes.map((paste) => {
		// 		return <div>{paste.imageURL}<FontAwesomeIcon size='lg' onClick={(e) => this.handlePasteDelete(e)} id={paste.pasteCollectionId} className='footer-icon' icon={['fas', 'trash-alt']} /></div>
		// 	})
		// }

		return (
			<div className='col-lg-12'>
				{this.state.successMessage && <Alert bsStyle="success">{this.state.successMessage}</Alert>}
				<MyPastesForm onChange={this.handleChange} onSubmit={this.handleSubmit} pasteForm={this.state.pasteForm} />
				{pastes}
			</div>
		);
	}
}

export default MyPastesContainer