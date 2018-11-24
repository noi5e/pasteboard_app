import React from 'react';
import PropTypes from 'prop-types';

class PastesList extends React.Component {
	render() {
		return (
			<div>
				{this.props.pastes}
			</div>
		);
	}
}

PastesList.propTypes = {
	pastes: PropTypes.array.isRequired
}

export default PastesList;