// This config is only used by Jest

module.exports = (api) => {
	const env = api.env();

	const plugins = [];

	// https://stackoverflow.com/a/70640363
	if (env === 'test') {
		plugins.push('babel-plugin-transform-import-meta');
		plugins.push('babel-plugin-transform-vite-meta-env');
	}

	return {
		presets: [
			[
				'@babel/preset-env',
				{
					modules: env === 'test' ? 'auto' : false,
				},
			],
			[
				'@babel/preset-react',
				{
					runtime: 'automatic',
					useBuiltIns: true,
				},
			],
			'@babel/preset-flow',
		],
		plugins,
	};
};
