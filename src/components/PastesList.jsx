import React from 'react';
import PropTypes from 'prop-types'
import ImageMasonry from 'react-image-masonry';

import Paste from './Paste.jsx'

class PastesList extends React.Component {
	
	render() {
		let pastes = [];

		pastes = this.props.pastes.map((paste, index) => {
			let userGalleryPaste = false

			if (paste.hasOwnProperty('_id')) {
				userGalleryPaste = true
			}

			return (
				<Paste key={paste._id || paste.pasteCollectionId} imageURL={paste.imageURL} description={paste.description} pasteID={paste._id || paste.pasteCollectionId} username={paste.username} userGalleryPaste={userGalleryPaste} />
			);
		});	

		return (
			<ImageMasonry
				numCols={3}
			>
				{pastes}
			</ImageMasonry>
		);
	}
}

PastesList.propTypes = {
	pastes: PropTypes.array.isRequired,
}

export default PastesList;