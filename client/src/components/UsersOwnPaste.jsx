import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FullViewPaste from './FullViewPaste.jsx'

class UsersOwnPaste extends React.Component {
	render() {
		return (
			<div className="image-element-class">
				<img src={this.props.imageURL} /><br />
				<div className="image-footer"><Link className='footer-link' to={{ pathname: "/pastes/" + this.props.pasteID, state: { imageURL: this.props.imageURL, description: this.props.description, pasteID: this.props.pasteID }}}><Glyphicon className="footer-icon" glyph="search" /></Link><Glyphicon className="footer-icon" id={this.props.pasteID} onClick={(e) => this.props.handlePasteDelete(e)} glyph="trash" /></div>
			</div>
		);
	}
}

UsersOwnPaste.propTypes = {
	imageURL: PropTypes.string.isRequired,
	pasteID: PropTypes.string.isRequired,
	handlePasteDelete: PropTypes.func.isRequired
}

export default UsersOwnPaste;