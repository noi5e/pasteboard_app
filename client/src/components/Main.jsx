import React from 'react';
import ReactDOM from 'react-dom';

import Auth from '../../modules/Auth.js';

import {
  Route,
  Link,
  Switch
} from 'react-router-dom'

import AllBooksContainer from './AllBooksContainer.jsx';
import LoginContainer from './LoginContainer.jsx';
import RegisterContainer from './RegisterContainer.jsx';
import MyPastesContainer from './MyPastesContainer.jsx';
import UserPastes from './UserPastes.jsx';
import FullViewPaste from './FullViewPaste.jsx'
import Logout from './Logout.jsx';
import NotFound from './NotFound.jsx'

class Main extends React.Component {
	render() {
		var navigationItems = "";

		if (Auth.isUserAuthenticated()) {
			navigationItems = 
			<ul className='nav nav-pills pull-right'>
				<li role='presentation'>
					<Link to='/'>Home</Link>
				</li>
				<li className='dropdown'>
					<a href="#" className='dropdown-toggle' data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">My Account <span className="caret"></span></a>
					<ul className='dropdown-menu'>
						<li><Link to="/my_pastes">My Pastes</Link></li>
						<li role="separator" className="divider"></li>
						<li><Link to='/logout'>Logout</Link></li>
					</ul>
				</li>
			</ul>;
		} else {
			navigationItems = <ul className='nav nav-pills pull-right'>
				<li role='presentation'><Link to='/'>Home</Link></li>
				<li role='presentation'><Link to='/login'>Login</Link></li>
				<li role='presentation'><Link to='/register'>Register</Link></li>
			</ul>;
		}

		return (
			<div className='container'>
				<div className='header clearfix'>
					<nav>
						{navigationItems}
					</nav>		
					<h3 className='text-muted'>Pasteboard</h3>
				</div>

				<div className='row'>
					<Switch>
						<Route exact path="/" component={AllBooksContainer} />
						<Route path="/logout" component={Logout} />
						<Route path="/login" component={LoginContainer} />
						<Route path="/register" component={RegisterContainer} />
						<Route path="/my_pastes" component={MyPastesContainer} />
						<Route exact path="/pastes/:pasteID" component={FullViewPaste} />
						<Route exact path="/users/:username" component={UserPastes} />
						<Route path="/404" component={NotFound} />
						<Route component={NotFound} />
					</Switch>
				</div>

				<footer className='footer'>
					<p>&copy; 2018 Will G</p>
				</footer>
			</div>
		);
	}
}

export default Main;