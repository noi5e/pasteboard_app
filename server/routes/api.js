const express = require('express');
const validator = require('validator');
let router = new express.Router();
const async = require('async');
const Book = require('../models/book');
const User = require('../models/user');
const jwt = require('jsonwebtoken')

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

	if (!formData || typeof formData.title !== 'string' || formData.title.trim().length === 0) {
		isFormValid = false;
		errors.title = 'Please provide a title for this book.';
	}

	if (!formData || typeof formData.author !== 'string' || formData.author.trim().length === 0) {
		isFormValid = false;
		errors.author = 'Please provide an author for this book.';
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

router.post('/delete_paste', (request, response, next) => {
	verifyJWT(request, (error, decodedToken) => {
		if (error) { console.log('error verifying JWT for delete paste request: ' + error); }

		User.findOne({ _id: decodedToken.sub }, (error, user) => {
			if (error) { console.log('error finding user for remove paste request' + error); }

			
		});
	});
})

router.post('/add_new_paste', (request, response, next) => {
	verifyJWT(request, (error, decodedToken) => {
		if (error) { console.log('error verifying JWT for add new paste request: ' + error); }

		User.findOne({ _id: decodedToken.sub }, (error, user) => {
			if (error) { console.log('error finding user for add new paste request: ' + error); }

			const dateCreated = new Date();

			const newPasteData = {
				imageURL: request.body.imageURL,
				description: request.body.description,
				dateCreated: dateCreated
			}

			const newPaste = new Paste(newPasteData);

			newPaste.save((error, paste) => {
				if (error) { console.log('error saving new paste in add new paste request: ' + error); }

				user.pastes = user.pastes.concat([{
					imageURL: request.body.imageURL,
					description: request.body.description,
					dateCreated: dateCreated,
					pasteCollectionId: paste._id.toString()
				}]);

				user.save((error, updatedUser) => {
					if (error) { console.log('error saving user\'s pastes in add new paste request:' + error); }

					response.status(200).json({
						pastes: updatedUser.pastes,
						message: 'Added new paste!'
					})
				});
			})
		})
	})
});

module.exports = router;