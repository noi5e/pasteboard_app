import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(faSearchPlus)

import FullViewPaste from './FullViewPaste.jsx';
import brokenImage from '../../dist/images/image_unavailable.jpg'

class AllPaste extends React.Component {
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
				{this.props.userGalleryPaste === true ? <div className='image-header'>pasted by <Link className='pasted-user-link' to={{ pathname: "/users/" + this.props.username, state: { imageURL: this.props.imageURL, description: this.props.description, pasteID: this.props.pasteID } }}>{this.props.username}</Link></div> : ''}
				
				{image}<br />
				<div className="image-footer">
					<Link className='footer-link' to={{ pathname: "/pastes/" + this.props.pasteID, state: { imageURL: this.props.imageURL, description: this.props.description, pasteID: this.props.pasteID }}}><FontAwesomeIcon size='lg' className='footer-icon' icon={['fas', 'search-plus']} /></Link>
				</div>
			</div>
		);
	}
}

AllPaste.propTypes = {
	imageURL: PropTypes.string.isRequired,
	pasteID: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
	username: PropTypes.string.isRequired
}

export default AllPaste;