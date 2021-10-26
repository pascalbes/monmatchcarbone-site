/* eslint-env node */
const HTMLPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')
const { EnvironmentPlugin } = require('webpack')

module.exports.default = {
	watchOptions: {
		// not setting this option resulted in too many files being watched
		// TODO we may have a problem with the number of node dependencies here, some not useful now that publicodes is outside this project. Is there a tool to prune dependencies in package.json ?
		ignored: /node_modules/,
	},
	resolve: {
		fallback: {
			path: 'path-browserify',
			buffer: 'buffer',
		},
		alias: {
			Actions: path.resolve('source/actions/'),
			Components: path.resolve('source/components/'),
			Pages: path.resolve('source/pages/'),
			Selectors: path.resolve('source/selectors/'),
			Reducers: path.resolve('source/reducers/'),
			Types: path.resolve('source/types/'),
			Images: path.resolve('source/images/'),
		},
		extensions: ['.js', '.ts', '.tsx'],
	},
	entry: {
		publicodes: './source/sites/publicodes/entry.js',
		iframe: './source/sites/publicodes/iframe.js',
	},
	output: {
		path: path.resolve('./dist/'),
		globalObject: 'self',
	},
	plugins: [
		new CopyPlugin([
			'./manifest.webmanifest',
			'./source/sites/publicodes/sitemap.txt',
			'./iframeResizer.contentWindow.min.js',
			'./source/images/MMC.jpg',
			'./source/images/MMC_inline.png',
			'./source/images/Logo Game Earth.png',
			'./source/images/fond_stade.jpg',
			'./source/images/fond_stade.png',
			'./source/images/MMC_blanc.png',
			'./source/images/republique-francaise-logo.png',
			'./source/font/MonumentExtended-Regular.otf',
			'./source/font/MonumentExtended-Ultrabold.otf',
			'./source/images/dessin_mmc1.png',
			'./source/images/dessin_mmc2.png',
			'./source/images/mmc_favicon.png',
			{
				from: './source/data',
				to: 'data',
			},
		]),
	],
}

module.exports.styleLoader = (styleLoader) => ({
	test: /\.css$/,
	use: [
		{ loader: styleLoader },
		{
			loader: 'css-loader',
			options: {
				sourceMap: true,
				importLoaders: 1,
			},
		},
		{
			loader: 'postcss-loader',
		},
	],
})

module.exports.commonLoaders = (mode = 'production') => {
	const babelLoader = {
		loader: 'babel-loader',
		options: {
			presets: [
				[
					'@babel/preset-env',
					{
						targets: {
							esmodules: true,
						},
						useBuiltIns: 'entry',
						corejs: '3',
					},
				],
			],
			plugins: [
				// ... other plugins
				mode === 'development' && require.resolve('react-refresh/babel'),
			].filter(Boolean),
		},
	}

	return [
		{
			test: /node_modules\/vfile\/core\.js/,
			use: [
				{
					loader: 'imports-loader',
					options: {
						type: 'commonjs',
						imports: ['single process/browser process'],
					},
				},
			],
		},
		{
			test: /\.(js|ts|tsx)$/,
			use: [babelLoader],
			exclude: /node_modules|dist/,
		},
		{
			test: /\.(jpe?g|png|svg)$/,
			use: {
				loader: 'file-loader',
				options: {
					name: 'images/[name].[ext]',
				},
			},
		},
		{
			test: /\.yaml$/,
			use: ['json-loader', 'yaml-loader'],
		},
		{
			test: /\.toml$/,
			use: ['toml-loader'],
		},
		{
			test: /\.ne$/,
			use: [babelLoader, 'nearley-loader'],
		},
		{
			test: /\.csv$/,
			loader: 'csv-loader',
			options: {
				dynamicTyping: true,
				header: true,
				skipEmptyLines: true,
			},
		},
		{
			test: /\.(ttf|woff2?)$/,
			use: [
				{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'fonts',
						publicPath: '/fonts',
					},
				},
			],
		},
	]
}

module.exports.HTMLPlugins = ({ injectTrackingScript = false } = {}) => [
	new HTMLPlugin({
		template: 'index.html',
		logo: 'https://monmatchcarbone.fr/mmc_favicon.png',
		chunks: ['publicodes'],
		title: 'Mon Match Carbone',
		description: 'Mon Match Carbone, le 1er simulateur d\'empreinte carbone dédié à la pratique sportive individuelle',
		filename: 'index.html',
		injectTrackingScript,
		base: '/',
	}),
]
