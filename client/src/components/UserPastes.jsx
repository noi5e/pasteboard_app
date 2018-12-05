import React from 'react';
import PastesList from './PastesList.jsx';
import HTTP from '../../modules/HTTP.js';
import { Redirect } from 'react-router-dom'

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

		HTTP.makeRequest(null, 'get', '/public/get_user_pastes?' + formData, false, (xhr) => {
			if (xhr.status === 200) {
				this.setState({
					pastes: xhr.response.pastes,
					isLoaded: true
				})
			} else {
				this.setState({
					cantFindUser: true,
					isLoaded: true
				})
			}
		});
	}

	render() {

		if (this.state.cantFindUser) {
			return (
				<Redirect to='/404' />
			)
		}

		return(
			<div className='col-lg-12'>
				{this.state.isLoaded ? 
					this.state.pastes && this.state.pastes.length > 0 ? 
						<div><h3 className='page-header'>{this.state.username + '\'s Pastes'}</h3><PastesList pastes={this.state.pastes} usersOwnPaste={false} /></div> : 
						this.state.username + ' doesn\'t have any pastes.' 
						: 'Loading...'}
			</div>
		)		
	}
}

export default UserPastes;