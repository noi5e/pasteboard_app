import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FullViewPaste from './FullViewPaste.jsx'
import brokenImage from '../../dist/images/image_unavailable.jpg'

class UsersOwnPaste extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			imageIsBroken: false
		}

		this.handleBrokenImage = this.handleBrokenImage.bind(this);
	}

	handleBrokenImage(event) {
		event.target.onerror = null;
		
		this.setState({
			imageIsBroken: true
		})
	}

	render() {
		let image = <img src={this.props.imageURL} onError={this.handleBrokenImage} />

		if (this.state.imageIsBroken) {
			image = <img src={brokenImage} />;
		}

		return (
			<div className="image-element-class">
				{image}<br />
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