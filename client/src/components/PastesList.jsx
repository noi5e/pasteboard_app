import React from 'react';
import PropTypes from 'prop-types';
import Paste from './Paste.jsx';

class PastesList extends React.Component {
	render() {
		let pastes = [];
		pastes = this.props.pastes.map((paste) => {
			return <Paste imageURL={paste.imageURL} description={paste.description} />
		});	

		return (
			<div className='grid'>
				{pastes}
			</div>
		);
	}
}

PastesList.propTypes = {
	pastes: PropTypes.array.isRequired
}

export default PastesList;