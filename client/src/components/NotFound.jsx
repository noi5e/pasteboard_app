import React from 'react'

class NotFound extends React.Component {
	render() {
		return (
			<div className='col-lg-12'>
				<h2 className='page-header'>Oops!</h2>
				{"We can\'t find that page."}
			</div>
		);
	}
}

export default NotFound