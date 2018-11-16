import React from 'react';

import PropTypes from 'prop-types';

import { Alert, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';

class RegisterForm extends React.Component {
	render() {
		var firstNameError = "";
		var lastNameError = "";
		var usernameError = "";
		var emailError = "";
		var streetError = "";
		var cityError = "";
		var stateError = "";
		var zipCodeError = "";
		var passwordError = "";
		var passwordTwoError = "";

		if (this.props.errors.firstName) {
			firstNameError = <HelpBlock className='help-block-text'>{this.props.errors.firstName}</HelpBlock>;
		}

		if (this.props.errors.lastName) {
			lastNameError = <HelpBlock className='help-block-text'>{this.props.errors.lastName}</HelpBlock>;
		}

		if (this.props.errors.username) {
			usernameError = <HelpBlock className='help-block-text'>{this.props.errors.username}</HelpBlock>;
		}

		if (this.props.errors.email) {
			emailError = <HelpBlock className='help-block-text'>{this.props.errors.email}</HelpBlock>;
		}

		if (this.props.errors.street) {
			streetError = <HelpBlock className='help-block-text'>{this.props.errors.street}</HelpBlock>;
		}

		if (this.props.errors.city) {
			cityError = <HelpBlock className='help-block-text'>{this.props.errors.city}</HelpBlock>;
		}

		if (this.props.errors.state) {
			stateError = <HelpBlock className='help-block-text'>{this.props.errors.state}</HelpBlock>;
		}

		if (this.props.errors.zipCode) {
			zipCodeError = <HelpBlock className='help-block-text'>{this.props.errors.zipCode}</HelpBlock>;
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

				<FormGroup controlId="lastName">
					<ControlLabel>Last Name</ControlLabel>
					<FormControl type="text" value={this.props.user.lastName} onChange={this.props.onChange} />
					{lastNameError}
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

				<FormGroup controlId="street">
					<ControlLabel>Street</ControlLabel>
					<FormControl type="text" value={this.props.user.street} onChange={this.props.onChange} />
					{streetError}
				</FormGroup>

				<FormGroup controlId="city">
					<ControlLabel>City</ControlLabel>
					<FormControl type="text" value={this.props.user.city} onChange={this.props.onChange} />
					{cityError}
				</FormGroup>

				<FormGroup controlId="state">
					<ControlLabel>State</ControlLabel>
					<FormControl type="text" value={this.props.user.state} onChange={this.props.onChange} />
					{stateError}
				</FormGroup>

				<FormGroup controlId="zipCode">
					<ControlLabel>Zip Code</ControlLabel>
					<FormControl type="text" value={this.props.user.zipCode} onChange={this.props.onChange} />
					{zipCodeError}
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