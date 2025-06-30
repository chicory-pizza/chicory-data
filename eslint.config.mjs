import js from '@eslint/js';
import eslintReact from '@eslint-react/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import jest from 'eslint-plugin-jest';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import testingLibrary from 'eslint-plugin-testing-library';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	js.configs.recommended,
	tseslint.configs.strict, // todo switch to strictTypeChecked

	importPlugin.flatConfigs.typescript,
	jest.configs['flat/recommended'],
	jest.configs['flat/style'],
	jsxA11y.flatConfigs.recommended,
	eslintReact.configs['recommended-typescript'],
	reactHooks.configs['recommended-latest'],
	{
		rules: {
			'no-var': 'error',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					// args: 'none',
					ignoreRestSiblings: true,
				},
			],
			'prefer-const': 'warn',

			// `importPlugin.flatConfigs.recommended` without slow rules
			// https://typescript-eslint.io/troubleshooting/typed-linting/performance/#eslint-plugin-import
			'import/export': 'error',
			'import/no-duplicates': 'warn',
			'import/no-named-as-default': 'warn',

			'import/enforce-node-protocol-usage': ['error', 'always'],
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
			// parserOptions: {
			// 	projectService: true,
			// 	tsconfigRootDir: import.meta.dirname,
			// },
		},
	},
	{
		files: ['**/*.cjs'],
		rules: {
			'@typescript-eslint/no-require-imports': 'off',
		},
		languageOptions: {
			// Gives error of 'Parsing error: sourceType option must be "script", "module", or "unambiguous" if set'
			// sourceType: 'commonjs',
			globals: {
				...globals.node,
			},
		},
	},
	{
		files: ['**/*.cjs', '**/*.mjs'],
		extends: [tseslint.configs.disableTypeChecked],
	},
	{
		files: [
			'**/testUtil/**/*.[jt]s?(x)',
			'**/__tests__/**/*.[jt]s?(x)',
			'**/?(*.)+(spec|test).[jt]s?(x)',
		],
		...testingLibrary.configs['flat/react'],
	},
	{
		ignores: ['dist/', 'coverage/'],
	}
);
