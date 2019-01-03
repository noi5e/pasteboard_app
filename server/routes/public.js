const express = require('express');
let router = new express.Router();

const User = require('../models/user');
const Paste = require('../models/paste');

router.get('/get_all_pastes', (request, response, next) => {
	Paste.find({}, (error, pastes) => {
		if (error) { console.log('error retrieving all pastes: ' + error); }

		response.status(200).json({
			pastes: pastes
		});
	})
});

router.get('/get_individual_paste', (request, response, next) => {
	Paste.findOne({ _id: request.query.pasteID }, (error, paste) => {
		if (error) { console.log('error finding paste for get individual paste request: ' + error); }

		if (paste) {
			response.status(200).json({
				paste: paste
			})
		} else {
			response.status(400).json({
				message: "Can't find paste."
			})
		}
	})
});

router.get('/get_user_pastes', (request, response, next) => {
	User.findOne({ username: request.query.username }, (error, user) => {
		if (error) { console.log('error finding user for get user pastes request: ' + error); }

		if (user) {
			response.status(200).json({
				pastes: user.pastes
			});
		} else {
			response.status(400).json({
				message: "Can't find user."
			});
		}
	});
});

module.exports = router;