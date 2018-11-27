import React from 'react';
import PropTypes from 'prop-types';
import Paste from './Paste.jsx';
import ImageMasonry from 'react-image-masonry';

const masonryOptions = {
	transitionDuration: 0,
	updateOnEachImageLoad: true
};

class PastesList extends React.Component {
	render() {
		let pastes = [];

		pastes = this.props.pastes.map((paste, index) => {
			return <Paste key={index} imageURL={paste.imageURL} description={paste.description} />
		});	

		// pastes = this.props.pastes.map((paste, index) => {
		// 	return paste.imageURL;
		// });

		return (
			<ImageMasonry
				numCols={3}
				forceOrder={true}
			>
				{pastes}
			</ImageMasonry>
		);
	}
}

PastesList.propTypes = {
	pastes: PropTypes.array.isRequired
}

export default PastesList;