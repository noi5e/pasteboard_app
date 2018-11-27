import React from 'react';
import PastesList from './PastesList.jsx';
import HTTP from '../../modules/HTTP.js';

class UserPastes extends React.Component {
	constructor(props) {
		super(props);

		const username = this.props.match.params.username;

		this.state = {
			isLoaded: false,
			pastes: []
		}
	}

	componentDidMount() {
		const username = encodeURIComponent(username);
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
		<div className='col-lg-12'>
			<h3 className='page-header'>{username + '\'s Pastes'}</h3>
			{this.state.isLoaded ? this.state.pastes.length > 0 ? <PasteList pastes={this.state.pastes} /> : username + ' doesn\'t have any pastes.' : 'Loading...'}
		</div>
	}
}

export default UserPastes;