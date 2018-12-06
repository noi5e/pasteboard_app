import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FullViewPaste from './FullViewPaste.jsx';
import brokenImage from '../../dist/images/image_unavailable.jpg'

class OtherUsersPaste extends React.Component {
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
				<div className="image-header">
					pasted by <Link className='pasted-user-link' to={{ pathname: "/users/" + this.props.username, state: { imageURL: this.props.imageURL, description: this.props.description, pasteID: this.props.pasteID } }}>{this.props.username}</Link>
				</div>
				{image}<br />
				<div className="image-footer">
					<Link className='footer-link' to={{ pathname: "/pastes/" + this.props.pasteID, state: { imageURL: this.props.imageURL, description: this.props.description, pasteID: this.props.pasteID }}}><Glyphicon className="footer-icon" glyph="search" /></Link>
				</div>
			</div>
		);
	}
}

OtherUsersPaste.propTypes = {
	imageURL: PropTypes.string.isRequired,
	pasteID: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired
}

export default OtherUsersPaste;