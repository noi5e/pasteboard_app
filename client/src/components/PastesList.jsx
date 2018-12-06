import React from 'react';
import PropTypes from 'prop-types';
import UsersOwnPaste from './UsersOwnPaste.jsx';
import OtherUsersPaste from './OtherUsersPaste.jsx';
import ImageMasonry from 'react-image-masonry';

class PastesList extends React.Component {
	
	render() {
		let pastes = [];

		if (this.props.usersOwnPaste == true) {
			pastes = this.props.pastes.map((paste, index) => {
				return (
					<UsersOwnPaste key={paste.pasteCollectionId} handlePasteDelete={(e) => this.props.handlePasteDelete(e)} imageURL={paste.imageURL} description={paste.description} handleBrokenImage={this.handleBrokenImage} pasteID={paste.pasteCollectionId} />
				);
			});	
		} else {
			pastes = this.props.pastes.map((paste, index) => {
				return (
					<OtherUsersPaste key={paste.pasteCollectionId || paste._id} imageURL={paste.imageURL} description={paste.description} pasteID={paste.pasteCollectionId || paste._id} username={paste.username} />
				);
			});	
		}

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
	usersOwnPaste: PropTypes.bool.isRequired
}

export default PastesList;