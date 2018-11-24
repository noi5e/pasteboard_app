import React from 'react';
import PropTypes from 'prop-types';
import { Jumbotron, FormGroup, ControlLabel, FormControl, Button, InputGroup, Glyphicon, HelpBlock } from 'react-bootstrap';

class MyPastesForm extends React.Component{
	render() {
		return (
			<Jumbotron>
				<h2 className='page-header'>Add New Paste</h2>
				<form onSubmit={this.props.onSubmit}>
					<FormGroup controlId="imageURL">
						<ControlLabel>Image URL</ControlLabel>
						<FormControl type="text" value={this.props.pasteForm.imageURL} onChange={this.props.onChange} />
						{this.props.imageURLError ? 'error' : '' }
					</FormGroup>
					<FormGroup controlId="description">
						<ControlLabel>Description</ControlLabel>
						<FormControl type="text" value={this.props.pasteForm.description} onChange={this.props.onChange} />
						{this.props.descriptionError ? 'error' : '' }
					</FormGroup>

					<Button type="submit">Add New Paste</Button>
				</form>
			</Jumbotron>
		);
	}
}

MyPastesForm.propTypes = {
	onChange: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	pasteForm: PropTypes.object.isRequired
}

export default MyPastesForm;