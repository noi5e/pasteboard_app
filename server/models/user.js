const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
	username: {
		type: String
	},
	githubId: {
		type: String
	},
	pastes: []
})

const User = module.exports = mongoose.model('User', UserSchema)