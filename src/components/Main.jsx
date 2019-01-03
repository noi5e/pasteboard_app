import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import { Button, Alert } from 'react-bootstrap'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
library.add(faGithub)

import io from 'socket.io-client'
const socket = io(process.env.APP_URL)

import Auth from '../modules/Auth.js'
import AllPastesContainer from './AllPastesContainer.jsx'
import FullViewPaste from './FullViewPaste.jsx'
import UserGallery from './UserGallery.jsx'
import MyPastesContainer from './MyPastesContainer.jsx'
import NotFound from './NotFound.jsx'
import Logout from './Logout.jsx'

class Main extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			isLoggedIn: false,
			pastes: [],
			loginButtonDisabled: ''
		}

		this.handleAuthentication = this.handleAuthentication.bind(this)
		this.handleLogout = this.handleLogout.bind(this)
	}

	checkPopup() {
		const check = setInterval(() => {
			const { popup } = this

			if (!popup || popup.closed || popup.closed === undefined) {
				clearInterval(check)
				this.setState({ loginButtonDisabled: '' })
			}
		}, 1000)
	}

	componentDidMount() {
		if (Auth.isUserAuthenticated()) {
			this.setState({
				isLoggedIn: true
			})
		}

		socket.on('github', (response) => {
			this.popup.close()

			console.log('response in GithubAuth', response)
			this.handleAuthentication(response)
		})
	}

	startAuth(e) {
		if (!this.state.loginButtonDisabled) {
			e.preventDefault()
			this.popup = this.openPopup()
			this.checkPopup()
			this.setState({ loginButtonDisabled: 'disabled' })
		}
	}

	closeCard() {
		this.setState({ isLoggedIn: false })
	}

	openPopup() {
		const width = 600, height = 600
		const left = (window.innerWidth / 2) - (width / 2)
		const top = (window.innerHeight / 2) - (height / 2)
		const url = `/auth/login?socketId=${socket.id}`

		return window.open(url, '',
			`toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${top}, left=${left}`
		)
	}

	handleAuthentication(response) {
		if (response.error) {
			console.log(response.error)
		} else {
			console.log('token in Main:', response.token)
			console.log('username in Main:', response.username)

			Auth.authenticateUser(response.token, response.username)

			localStorage.setItem('successMessage', response.message)

			this.setState({
				isLoggedIn: true
			})
		}
	}

	handleLogout(message) {
		localStorage.setItem('successMessage', message)
	}

	render() {
		let navigationItems = ''

		if (this.state.isLoggedIn === true && Auth.isUserAuthenticated()) {
			navigationItems = 
				<ul className='nav nav-pills pull-right'>
					<li className='dropdown'>
						<a href="#" className='dropdown-toggle' data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{Auth.getUsername()}<span className="caret"></span></a>
						<ul className='dropdown-menu'>
							<li><Link to="/my_pastes">My Pastes</Link></li>
							<li role="separator" className="divider"></li>
							<li><Link to='/logout'>Logout</Link></li>
						</ul>
					</li>
				</ul>
		} else {
			navigationItems = 
						<ul className='nav nav-pills pull-right'>
							<li role='presentation'>
								<Button className='github-login-button' onClick={this.startAuth.bind(this)}>
									<FontAwesomeIcon icon={['fab', 'github']} size='lg' className='github-logo' /> Login with Github
								</Button>
							</li>
						</ul>

		}

		return (
			<div className='container'>
				<div className='header clearfix'>
					<nav>
						{navigationItems}
					</nav>
					<h3 className='text-muted'><Link id='home-link' to='/'>Pasteboard</Link></h3>
				</div>

				<div className='row'>
					<Switch>
						<Route exact path="/" render={(props) => <AllPastesContainer {...props} handleLogout={(message) => this.handleLogout(message)} />} />
						<Route path="/my_pastes" component={MyPastesContainer} />
						<Route path="/logout" component={Logout} />
						<Route exact path="/pastes/:pasteID" component={FullViewPaste} />
						<Route exact path="/users/:username" component={UserGallery} />
						<Route path="/404" component={NotFound} />
						<Route component={NotFound} />
					</Switch>
				</div>

				<footer className='footer'>
					<p>&copy; 2018 Will G</p>
				</footer>
			</div>
		)
	}
}

export default Main