import React from 'react';
import PastesList from './PastesList.jsx';
import HTTP from '../../modules/HTTP.js';

class UserPastes extends React.Component {
	constructor(props) {
		super(props);

		const username = this.props.match.params.username;

		this.state = {
			isLoaded: false,
			pastes: [],
			username,
			cantFindUser: false
		}
	}

	componentDidMount() {
		const username = encodeURIComponent(this.state.username);
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
		});
	}

	render() {

		return(
			<div className='col-lg-12'>
				{this.state.isLoaded ? this.state.pastes && this.state.pastes.length > 0 ? <div><h3 className='page-header'>{this.state.username + '\'s Pastes'}</h3><PastesList pastes={this.state.pastes} /></div> : username + ' doesn\'t have any pastes.' : 'Loading...'}
				{this.state.cantFindUser ? 'Error loading user page.' : ''}
			</div>
		)		
	}
}

export default UserPastes;