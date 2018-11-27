import React from 'react';
import PropTypes from 'prop-types';

class Paste extends React.Component {
	render() {
		return (
			<div className="image-element-class" >
				<img src={this.props.imageURL} /><br />
				<div className="caption">{this.props.description}</div>
			</div>
		);
	}
}

Paste.propTypes = {
	imageURL: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired
}

export default Paste;