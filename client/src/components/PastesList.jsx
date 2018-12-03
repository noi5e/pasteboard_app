import React from 'react';
import PropTypes from 'prop-types';
import Paste from './Paste.jsx';
import ImageMasonry from 'react-image-masonry';

class PastesList extends React.Component {
	render() {
		let pastes = [];

		let usersOwnPastes = this.props.pastes[0].hasOwnProperty('pasteCollectionId');

		let pasteIDproperty = this.props.pastes[0].hasOwnProperty('pasteCollectionId') ? 'pasteCollectionId' : '_id';

		pastes = this.props.pastes.map((paste, index) => {
			console.log(paste.username)

			return <Paste key={paste[pasteIDproperty]} handlePasteDelete={(e) => this.props.handlePasteDelete(e)} imageURL={paste.imageURL} description={paste.description} pasteID={paste[pasteIDproperty]} username={paste.username} usersOwnPastes={usersOwnPastes} />
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