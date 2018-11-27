import React from 'react';
import PropTypes from 'prop-types';
import { Button, Glyphicon } from 'react-bootstrap';

class Paste extends React.Component {
	render() {
		return (
			<div className="image-element-class" >
				<img src={this.props.imageURL} /><br />
				<div className="image-footer"><Glyphicon className="footer-icon" glyph="search" /><Glyphicon className="footer-icon" glyph="trash" /></div>
			</div>
		);
	}
}

Paste.propTypes = {
	imageURL: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired
}

export default Paste;