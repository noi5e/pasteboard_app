import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearchPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(faTrashAlt)
library.add(faSearchPlus)

import FullViewPaste from './FullViewPaste.jsx'
import brokenImage from '../../dist/images/image_unavailable.jpg'

class MyPaste extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			imageIsBroken: false
		}

		this.handleBrokenImage = this.handleBrokenImage.bind(this)
	}

	handleBrokenImage(event) {
		event.target.onerror = null

		this.setState({
			imageIsBroken: true
		})
	}

	render() {
		let image = <img src={this.props.imageURL} onError={this.handleBrokenImage} style={{ paddingLeft: '5px', paddingRight: '5px', paddingTop: '5px', width: '376px' }} />

		if (this.state.imageIsBroken) {
			image = <img src={brokenImage} />;
		}

		return (
			<div>
				{image}<br />
				<div style={{ position: 'relative', top: '-30px', paddingRight: '10px', textAlign: 'right' }}><Link className='footer-link' to={{ pathname: "/pastes/" + this.props.pasteID, state: { imageURL: this.props.imageURL, description: this.props.description, pasteID: this.props.pasteID }}}><FontAwesomeIcon size='lg' className='footer-icon my-footer-icon' icon={['fas', 'search-plus']} /></Link><FontAwesomeIcon size='lg' onClick={(e) => this.props.handlePasteDelete(e)} id={this.props.pasteID} className='footer-icon my-footer-icon' icon={['fas', 'trash-alt']} /></div>
			</div>
		)

		return (
			// className="image-element-class"
			// className="image-footer"
			<div className="image-element-class" style={{padding:'1em'}}>
				{image}<br />
				<div className="image-footer"><Link className='footer-link' to={{ pathname: "/pastes/" + this.props.pasteID, state: { imageURL: this.props.imageURL, description: this.props.description, pasteID: this.props.pasteID }}}><FontAwesomeIcon size='lg' className='footer-icon' icon={['fas', 'search-plus']} /></Link><FontAwesomeIcon size='lg' onClick={(e) => this.props.handlePasteDelete(e)} id={this.props.pasteID} className='footer-icon' icon={['fas', 'trash-alt']} /></div>
			</div>
		);
	}

	// <Glyphicon className="footer-icon" glyph="search" />
	// <Glyphicon className="footer-icon" id={this.props.pasteID} onClick={(e) => this.props.handlePasteDelete(e)} glyph="trash" />
}

export default MyPaste