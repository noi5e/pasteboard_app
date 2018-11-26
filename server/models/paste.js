const mongoose = require('mongoose');

const PasteSchema = mongoose.Schema({
	imageURL: {
		type: String
	},
	description: {
		type: String
	},
	dateCreated: {
		asafdsdf
	}
})

const Paste = module.exports = mongoose.model('Paste', PasteSchema);