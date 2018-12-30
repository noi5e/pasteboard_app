import React from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-component'

import MyPaste from './MyPaste.jsx';

class MyPastesList extends React.Component {

	render() {
		const pastes = this.props.pastes.map((paste, index) => {
			return (
				<MyPaste key={paste.pasteCollectionId} pasteId={paste.pasteCollectionId} handlePasteDelete={(e) => this.props.handlePasteDelete(e)} imageURL={paste.imageURL} description={paste.description} pasteID={paste.pasteCollectionId} username={paste.username} />
			);
		});	

		return (
			<Masonry
				elementType='div'
				// numCols={3}
			>
				{pastes}
			</Masonry>
		);
	}
}

MyPastesList.propTypes = {
	pastes: PropTypes.array.isRequired
}

export default MyPastesList