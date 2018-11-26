import React from 'react';
import PropTypes from 'prop-types';
import Paste from './Paste.jsx';
import Masonry from 'react-masonry-component';

class PastesList extends React.Component {
	render() {
		let pastes = [];

		pastes = this.props.pastes.map((paste, index) => {
			return <Paste key={index} imageURL={paste.imageURL} description={paste.description} />
		});	

		return (
			<Masonry className='grid'>
				{pastes}
			</Masonry>
		);
	}
}

PastesList.propTypes = {
	pastes: PropTypes.array.isRequired
}

export default PastesList;