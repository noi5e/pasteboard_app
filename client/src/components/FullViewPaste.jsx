import React from 'react'
import HTTP from '../../modules/HTTP.js'

class FullViewPaste extends React.Component {
	constructor(props) {
		super(props);

		let isLoaded = false;

		if (this.props.location.state.description && this.props.location.state.imageURL && this.props.location.state.pasteID) {
			isLoaded = true;
		}

		this.state = {
			description: this.props.location.state.description ? this.props.location.state.description : undefined,
			imageURL: this.props.location.state.imageURL ? this.props.location.state.imageURL : undefined,
			pasteID: this.props.location.state.pasteID ? this.props.location.state.pasteID : undefined ,
			isLoaded: isLoaded
		}
	}

	componentDidMount() {
		if (!this.state.isLoaded) {
			console.log('make HTTP request');
		}
	}

	render() {
		if (this.state.isLoaded) {
			return(
				<div><img src={this.state.imageURL} /><br />{this.state.description}</div>
			);
		}

		return (
			<div>
				Loading...
			</div>		
		)
	}
}

export default FullViewPaste