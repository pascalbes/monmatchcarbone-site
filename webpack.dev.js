const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const path = require('path')

const {
	commonLoaders,
	styleLoader,
	HTMLPlugins,
	default: common,
} = require('./webpack.common')

module.exports = {
	...common,
	module: {
		rules: [...commonLoaders('development'), styleLoader('style-loader'),
		{
			test: /node_modules\/vfile\/core\.js/,
			use: [{
			  loader: 'imports-loader',
			  options: {
				type: 'commonjs',
				imports: ['single process/browser process'],
			  },
			}],
		  },],
	},
	devServer: {
		historyApiFallback: true,
		static: path.join(__dirname, 'dist'),
		hot: true,
	},
	mode: 'development',
	plugins: [
		...(common.plugins || []),
		...HTMLPlugins({ injectTrackingScript: true }),
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify('development'),
			'process.env.MODEL_URL': JSON.stringify(process.env.MODEL_URL)
		}),
		new webpack.HotModuleReplacementPlugin(),
		new ReactRefreshWebpackPlugin(),
	],
}
