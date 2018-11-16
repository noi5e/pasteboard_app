import Auth from './Auth.js'

class Post {

	static makePostRequest(formData, path, authorizationRequired, callback) {
		const xhr = new XMLHttpRequest();
		xhr.open('post', path);
		xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		xhr.responseType = 'json';

		if (authorizationRequired) {
			if (Auth.isUserAuthenticated()) {
				xhr.setRequestHeader('Authorization', `Bearer ${Auth.getToken()}`);
			} else {
				xhr.setRequestHeader('Authorization', `Bearer null`);
			}
		}

		let response = [];

		xhr.addEventListener('load', () => {
			callback(xhr);
		});

		if (formData) {
			xhr.send(formData);
		} else {
			xhr.send();
		}
	}

}

export default Post;