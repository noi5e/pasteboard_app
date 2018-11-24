const express = require('express');
let router = new express.Router();
const User = require('../models/user');

router.get('/get_user_pastes', (request, response, next) => {
	User.find({});
});

module.exports = router;