import React from 'react';
import PropTypes from 'prop-types';
import Paste from './Paste.jsx';
import ImageMasonry from 'react-image-masonry';

class PastesList extends React.Component {
	render() {
		let pastes = [];
		let pasteIDproperty = this.props.pastes[0].hasOwnProperty('pasteCollectionId') ? 'pasteCollectionId' : '_id';

		pastes = this.props.pastes.map((paste, index) => {
			return <Paste key={paste[pasteIDproperty]} imageURL={paste.imageURL} description={paste.description} pasteID={paste[pasteIDproperty]} />
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
	pastes: PropTypes.array.isRequired
}

export default PastesList;