const mongoose = require('mongoose');

const PasteSchema = mongoose.Schema({
	imageURL: {
		type: String
	},
	description: {
		type: String
	},
	dateCreated: {
		type: Number
	},
	userId: {
		type: String
	},
	username: {
		type: String
	}
})

const Paste = module.exports = mongoose.model('Paste', PasteSchema);