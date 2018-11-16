import React from 'react';

import PropTypes from 'prop-types';

import { Alert, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';

class RegisterForm extends React.Component {
	render() {
		var firstNameError = "";
		var usernameError = "";
		var emailError = "";
		var passwordError = "";
		var passwordTwoError = "";

		if (this.props.errors.firstName) {
			firstNameError = <HelpBlock className='help-block-text'>{this.props.errors.firstName}</HelpBlock>;
		}

		if (this.props.errors.username) {
			usernameError = <HelpBlock className='help-block-text'>{this.props.errors.username}</HelpBlock>;
		}

		if (this.props.errors.email) {
			emailError = <HelpBlock className='help-block-text'>{this.props.errors.email}</HelpBlock>;
		}

		if (this.props.errors.password) {
			passwordError = <HelpBlock className='help-block-text'>{this.props.errors.password}</HelpBlock>;
		}

		if (this.props.errors.passwordTwo) {
			passwordTwoError = <HelpBlock className='help-block-text'>{this.props.errors.passwordTwo}</HelpBlock>;
		}

		return (
			<form onSubmit={this.props.onSubmit}>
				<FormGroup controlId="firstName">
					<ControlLabel>First Name</ControlLabel>
					<FormControl type="text" value={this.props.user.firstName} onChange={this.props.onChange} />
					{firstNameError}
				</FormGroup>

				<FormGroup controlId="username">
					<ControlLabel>Username</ControlLabel>
					<FormControl type="text" value={this.props.user.username} onChange={this.props.onChange} />
					{usernameError}
				</FormGroup>

				<FormGroup controlId="email">
					<ControlLabel>E-mail</ControlLabel>
					<FormControl type="email" value={this.props.user.email} onChange={this.props.onChange} />
					{emailError}
				</FormGroup>

				<FormGroup controlId="password">
					<ControlLabel>Password</ControlLabel>
					<FormControl type="password" value={this.props.user.password} onChange={this.props.onChange} />
					{passwordError}
				</FormGroup>

				<FormGroup controlId="passwordTwo">
					<ControlLabel>Confirm Password</ControlLabel>
					<FormControl type="password" value={this.props.user.passwordTwo} onChange={this.props.onChange} />
					{passwordTwoError}
				</FormGroup>

				<Button type="submit">Submit</Button>
			</form>
		);
	}
}

RegisterForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired,
}

export default RegisterForm;