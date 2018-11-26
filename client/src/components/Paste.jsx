import React from 'react';
import PropTypes from 'prop-types';

class Paste extends React.Component {
	render() {
		return (
			<div class="grid-item">
				<img src={this.props.imageURL} /><br />
				{description}
			</div>
		);
	}
}

Paste.propTypes = {
	imageURL: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired
}

export default Paste;