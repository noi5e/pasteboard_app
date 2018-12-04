import React from 'react'
import HTTP from '../../modules/HTTP.js'
import { Redirect } from 'react-router-dom'

class FullViewPaste extends React.Component {
	constructor(props) {
		super(props);

		let isLoaded = false;

		if (this.props.location.state) {
			this.state = {
				description: this.props.location.state.description,
				imageURL: this.props.location.state.imageURL,
				pasteID: this.props.location.state.pasteID,
				isLoaded: true,
				cantFindPaste: false
			}
		} else {
			this.state = {
				description: undefined,
				imageURL: undefined,
				pasteID: undefined,
				isLoaded: false,
				cantFindPaste: false
			}
		}
	}

	componentDidMount() {
		if (this.state.description && this.state.imageURL && this.state.pasteID) {
			this.setState({
				isLoaded: true
			})
		} else {
			const pasteID = encodeURIComponent(this.props.match.params.pasteID);
			const formData = `pasteID=${pasteID}`

			HTTP.makeRequest(null, 'get', '/public/get_individual_paste?' + formData, false, (xhr) => {
				if (xhr.status === 200) {
					this.setState({
						description: xhr.response.paste.description,
						imageURL: xhr.response.paste.imageURL,
						pasteID: xhr.response.paste._id,
						isLoaded: true
					})
				} else {
					console.log(xhr.response);

					this.setState({
						cantFindPaste: true
					})
				}
			})
		}
	}

	render() {
		if (this.state.cantFindPaste) {
			return (
				<Redirect to='/404' />
			)
		}

		if (this.state.isLoaded) {
			return(
				<div>
					<img className='full-view-paste' src={this.state.imageURL} /><br />
					<div className='full-view-paste-description'>{this.state.description}</div>
				</div>
			);
		}

		// 1168 px is the max

		return (
			<div>
				Loading...
			</div>		
		)
	}
}

export default FullViewPaste