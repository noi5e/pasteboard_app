const express = require('express');
let router = new express.Router();
const User = require('../models/user');

router.get('/get_user_pastes', (request, response, next) => {
	User.findOne({ username: request.query.username }, (error, user) => {
		if (error) { console.log('error finding user for get user pastes request: ' + error); }

		if (user) {
			response.status(200).json({
				pastes: user.pastes
			});
		} else {
			console.log('can\'t find user')

			response.status(500).json({
				message: "Can't find user."
			});
		}
	});
});

module.exports = router;