// https://github.com/facebook/create-react-app/blob/cee26589ff919e946030a5651a93ccba78a93293/packages/react-scripts/config/jest/fileTransform.js

const path = require('node:path');

const camelcase = require('camelcase');

// This is a custom Jest transformer turning file imports into filenames.
// https://jestjs.io/docs/webpack

/** @type {import('@jest/transform').Transformer} */
module.exports = {
	process(_src, filename) {
		const assetFilename = JSON.stringify(path.basename(filename));

		if (filename.match(/\.svg$/)) {
			// Based on how SVGR generates a component name:
			// https://github.com/smooth-code/svgr/blob/01b194cf967347d43d4cbe6b434404731b87cf27/packages/core/src/state.js#L6
			const pascalCaseFilename = camelcase(path.parse(filename).name, {
				pascalCase: true,
			});
			const componentName = `Svg${pascalCaseFilename}`;
			return `const React = require('react');
      module.exports = {
        __esModule: true,
        default: ${assetFilename},
        ReactComponent: React.forwardRef(function ${componentName}(props, ref) {
          return {
            $$typeof: Symbol.for('react.element'),
            type: 'svg',
            ref: ref,
            key: null,
            props: Object.assign({}, props, {
              children: ${assetFilename}
            })
          };
        }),
      };`;
		}

		return {
			code: `module.exports = ${assetFilename};`,
		};
	},
};
