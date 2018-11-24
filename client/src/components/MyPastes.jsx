import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

class MyProfile extends React.Component{
	render() {
		let message = "";

		if (this.props.successMessage) {
			message = <Alert bsStyle="success">{this.props.successMessage}</Alert>;
		}

		return (
			<div className='col-lg-12'>
				<h2 className='page-header'>My Pastes</h2>
				{message}
			</div>
		);
	}
}

MyProfile.propTypes = {
	successMessage: PropTypes.string.isRequired
}

export default MyProfile;