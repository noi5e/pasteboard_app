import React from 'react'
import PastesList from './PastesList.jsx'
import HTTP from '../../modules/HTTP.js';

class AllPastesContainer extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			pastes: [],
			isLoaded: false
		}
	}

	componentDidMount() {
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
			<div className='col-lg-12'>
				{this.state.isLoaded ? <PastesList pastes={this.state.pastes} /> : 'Loading...'}
			</div>
		);
	}
}

export default AllPastesContainer