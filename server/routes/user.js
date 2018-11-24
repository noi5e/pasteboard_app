const express = require('express');
let router = new express.Router();
const User = require('../models/user');

router.get('/get_user_pastes', (request, response, next) => {
	console.log(request.query.username);

	User.findOne({ username: request.body.username }, (user) => {

		// response.status(200).json({
		// 	pastes: user.pastes
		// });
	});
});

module.exports = router;