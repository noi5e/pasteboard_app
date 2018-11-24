const express = require('express');
let router = new express.Router();
const User = require('../models/user');

router.get('/get_user_pastes', (request, response, next) => {
	User.findOne({ username: request.query.username }, (error, user) => {
		if (error) { console.log('error finding user for get user pastes request: ' + error); }

		response.status(200).json({
			pastes: user.pastes
		});
	});
});

module.exports = router;