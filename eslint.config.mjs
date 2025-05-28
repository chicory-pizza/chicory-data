import js from '@eslint/js';
import eslintReact from '@eslint-react/eslint-plugin';
import flowtype from 'eslint-plugin-ft-flow';
import importPlugin from 'eslint-plugin-import';
import jest from 'eslint-plugin-jest';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import testingLibrary from 'eslint-plugin-testing-library';
import globals from 'globals';
import hermesParser from 'hermes-eslint';

export default [
	js.configs.recommended,

	importPlugin.flatConfigs.recommended,
	importPlugin.flatConfigs.react,
	jest.configs['flat/recommended'],
	jest.configs['flat/style'],
	jsxA11y.flatConfigs.recommended,
	eslintReact.configs['recommended'],
	reactHooks.configs['recommended-latest'],
	{
		plugins: {
			'ft-flow': flowtype,
		},
	},
	{
		rules: {
			...flowtype.configs.recommended.rules,

			'no-var': 'error',
			'no-unused-vars': [
				'warn',
				{
					args: 'none',
					ignoreRestSiblings: true,
				},
			],
			'prefer-const': 'warn',

			// Was disabled by flowtype.configs.recommended.rules
			'no-undef': 'error',
			'ft-flow/define-flow-type': 'error',

			// Prettier already handles this
			'no-mixed-spaces-and-tabs': 'off',
			'ft-flow/generic-spacing': 'off',
			'ft-flow/space-after-type-colon': 'off',

			'ft-flow/newline-after-flow-annotation': 'error',
			'ft-flow/require-indexer-name': 'error',
			'ft-flow/require-readonly-react-props': 'error',

			'import/no-unresolved': 'off', // bugged
			'import/order': [
				'warn',
				{
					'newlines-between': 'always',
					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
				},
			],
		},

		languageOptions: {
			globals: {
				...globals.browser,
			},
			parser: hermesParser,
		},

		settings: {
			'import/extensions': ['.js', '.jsx'],
		},
	},
	{
		files: ['**/*.cjs'],
		languageOptions: {
			// Gives error of 'Parsing error: sourceType option must be "script", "module", or "unambiguous" if set'
			// sourceType: 'commonjs',
			globals: {
				...globals.node,
			},
		},
	},
	{
		files: [
			'**/testUtil/**/*.[jt]s?(x)',
			'**/__tests__/**/*.[jt]s?(x)',
			'**/?(*.)+(spec|test).[jt]s?(x)',
		],
		...testingLibrary.configs['flat/react'],
		languageOptions: {
			globals: {
				__dirname: 'readable',
				process: 'readable',
			},
		},
	},
	{
		files: ['**/*.js', '**/*.jsx', '**/*.mjs'],
	},
	{
		ignores: ['flow-typed/', 'dist/', 'coverage/'],
	},
];
