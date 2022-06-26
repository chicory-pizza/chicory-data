// https://github.com/facebook/create-react-app/blob/bb64e31a81eb12d688c14713dce812143688750a/packages/react-scripts/config/jest/cssTransform.js

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This is a custom Jest transformer turning style imports into empty objects.
// http://facebook.github.io/jest/docs/en/webpack.html

module.exports = {
	process() {
		return {
			code: 'module.exports = {};',
		};
	},

	getCacheKey() {
		// The output is always the same.
		return 'cssTransform';
	},
};
