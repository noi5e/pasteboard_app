const express = require('express');
let router = new express.Router();
const validator = require('validator');
const async = require('async');
const jwt = require('jsonwebtoken')

const User = require('../models/user');
const Paste = require('../models/paste');

const verifyJWT = (request, callback) => {
	const jsonWebToken = request.headers.authorization.split(" ")[1];

	jwt.verify(jsonWebToken, process.env.JWT_KEY, (error, decodedToken) => {
		if (error) { 
			callback(error, undefined); 
		} else {
			callback(null, decodedToken);
		}
	})
}

function validatePasteForm(formData) {
	const errors = {};
	let isFormValid = true;
	let message = '';

	if (!formData || typeof formData.imageURL !== 'string' || formData.title.trim().length === 0) {
		isFormValid = false;
		errors.title = 'Please provide a URL for this paste.';
	}

	if (!formData || typeof formData.description !== 'string' || formData.author.trim().length === 0) {
		isFormValid = false;
		errors.author = 'Please provide an description for this paste.';
	}

	if (!isFormValid) {
		message = 'Check the form for errors.';
	}

	return {
		success: isFormValid,
		message,
		errors
	}
}

router.post('/remove_paste', (request, response, next) => {
	verifyJWT(request, (error, decodedToken) => {
		if (error) { console.log('error verifying JWT for delete paste request: ' + error); }

		User.findOne({ _id: decodedToken.sub }, (error, user) => {
			if (error) { console.log('error finding user for remove paste request' + error); }

			user.pastes = user.pastes.filter((paste) => {
				return paste.pasteCollectionId !== request.body.pasteID;
			})
			user.markModified('pastes');
			user.save()

			Paste.remove({ _id: request.body.pasteID }, (error) => {
				if (error) { console.log('error removing paste from paste database: ' + error); }
			})

			response.status(200).json({
				pastes: user.pastes,
				successMessage: 'You deleted one of your pastes.'
			})
		});
	});
})

router.post('/add_new_paste', (request, response, next) => {
	verifyJWT(request, (error, decodedToken) => {
		if (error) { console.log('error verifying JWT for add new paste request: ' + error); }

		User.findOne({ _id: decodedToken.sub }, (error, user) => {
			if (error) { console.log('error finding user for add new paste request: ' + error); }

			const dateCreated = Date.now();

			const newPasteData = {
				imageURL: request.body.imageURL,
				description: request.body.description,
				userId: user._id,
				username: user.username,
				dateCreated: dateCreated
			}

			const newPaste = new Paste(newPasteData);

			newPaste.save((error, paste) => {
				if (error) { console.log('error saving new paste in add new paste request: ' + error); }

				newUserPastes = user.pastes.concat([{
					imageURL: request.body.imageURL,
					description: request.body.description,
					dateCreated: dateCreated,
					pasteCollectionId: paste._id.toString(),
					username: user.username
				}]);

				user.pastes = newUserPastes;
				user.markModified('pastes');

				user.save((error, updatedUser) => {
					if (error) { console.log('error saving user\'s pastes in add new paste request:' + error); }

					response.status(200).json({
						pastes: newUserPastes,
						message: 'Added new paste!'
					})
				});
			})
		})
	})
});

module.exports = router;