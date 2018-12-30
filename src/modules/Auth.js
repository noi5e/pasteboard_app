class Auth {

	// authenticate a user. save a token string in local storage.
	static authenticateUser(token, username) {
		localStorage.setItem('token', token);
		localStorage.setItem('username', username)
	}

	static isUserAuthenticated() {
		return localStorage.getItem('token') !== null;
	}

	// deauthenticate a user. remove a token from local storage.
	static deauthenticateUser() {
		localStorage.removeItem('token');
		localStorage.removeItem('username');
	}

	static getToken() {
		return localStorage.getItem('token');
	}

	static getUsername() {
		return localStorage.getItem('username');
	}

}

export default Auth;