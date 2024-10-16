// https://github.com/facebook/create-react-app/blob/cee26589ff919e946030a5651a93ccba78a93293/packages/react-scripts/scripts/utils/createJestConfig.js

module.exports = {
	moduleNameMapper: {
		'^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
	},
	setupFiles: [
		// https://reactrouter.com/en/main/routers/picking-a-router#testing
		'whatwg-fetch',
	],
	setupFilesAfterEnv: ['<rootDir>/src/testUtil/setupTests.js'],
	testEnvironment: 'jsdom',
	transform: {
		'\\.jsx?$': 'babel-jest',
		'\\.css$': '<rootDir>/src/testUtil/cssTransform.cjs',
		'\\.png$': '<rootDir>/src/testUtil/fileTransform.cjs',
	},
	transformIgnorePatterns: ['/node_modules/(?!(browser-fs-access))/'],
};
