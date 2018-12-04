import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FullViewPaste from './FullViewPaste.jsx'

class Paste extends React.Component {
	render() {
		if (this.props.usersOwnPastes) {

			return (
				<div className="image-element-class">
					<img src={this.props.imageURL} /><br />
					<div className="image-footer"><Link className='footer-link' to={{ pathname: "/pastes/" + this.props.pasteID, state: { imageURL: this.props.imageURL, description: this.props.description, pasteID: this.props.pasteID }}}><Glyphicon className="footer-icon" glyph="search" /></Link><Glyphicon className="footer-icon" id={this.props.pasteID} onClick={(e) => this.props.handlePasteDelete(e)} glyph="trash" /></div>
				</div>
			);

		} else {

			console.log('username: ' + this.props.username);

			return (
				<div className="image-element-class">
					<div className="image-header">pasted by <Link className='pasted-user-link' to={{ pathname: "/users/" + this.props.username, state: { imageURL: this.props.imageURL, description: this.props.description, pasteID: this.props.pasteID } }}>{this.props.username}</Link></div>
					<img src={this.props.imageURL} /><br />
					<div className="image-footer">
					<Link className='footer-link' to={{ pathname: "/pastes/" + this.props.pasteID, state: { imageURL: this.props.imageURL, description: this.props.description, pasteID: this.props.pasteID }}}><Glyphicon className="footer-icon" glyph="search" /></Link></div>
				</div>
			);

		}
	}
}

Paste.propTypes = {
	imageURL: PropTypes.string.isRequired,
	pasteID: PropTypes.string.isRequired,
	usersOwnPastes: PropTypes.bool.isRequired
}

export default Paste;