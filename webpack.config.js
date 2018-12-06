var path = require('path');

module.exports = {
	entry: './client/src/app.jsx',
	output: {
		path: path.resolve(__dirname, 'client/dist/js'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?/,
				query: { presets: ['es2015', 'react'] },
				loader: 'babel-loader',
				include: __dirname + '/client'
			},
			{
				test: /\.jpg$/,
				loader: 'url-loader',
				// query: {
				// 	limit: 10000
				// }
				options: {
					outputPath: path.resolve(__dirname, 'client/dist/images')
				}
			}
		]
	}
};