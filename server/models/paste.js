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
	}
})

const Paste = module.exports = mongoose.model('Paste', PasteSchema);