import js from '@eslint/js';
import eslintReact from '@eslint-react/eslint-plugin';
import {defineConfig} from 'eslint/config';
import {importX} from 'eslint-plugin-import-x';
import jest from 'eslint-plugin-jest';
import jsxA11yX from 'eslint-plugin-jsx-a11y-x';
import reactHooks from 'eslint-plugin-react-hooks';
// import {reactRefresh} from 'eslint-plugin-react-refresh';
import testingLibrary from 'eslint-plugin-testing-library';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
	js.configs.recommended,
	tseslint.configs.strictTypeChecked,

	importX.flatConfigs.typescript,
	eslintReact.configs['strict-type-checked'],
	reactHooks.configs.flat.recommended,
	// reactRefresh.configs.vite(),
	jsxA11yX.configs.strict,
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

			'@eslint-react/immutability': 'error',

			'@typescript-eslint/no-misused-promises': [
				'error',
				{
					checksVoidReturn: false,
				},
			],
			// False results on object index access
			// https://typescript-eslint.io/rules/no-unnecessary-condition/#possibly-undefined-indexed-access
			'@typescript-eslint/no-unnecessary-condition': 'off',

			// `importX.flatConfigs.recommended` without slow rules
			// https://typescript-eslint.io/troubleshooting/typed-linting/performance/#eslint-plugin-import
			'import-x/export': 'error',
			'import-x/no-named-as-default': 'warn',
			'import-x/no-duplicates': 'warn',

			// 'import/enforce-node-protocol-usage': ['error', 'always'],
			'import-x/order': [
				'warn',
				{
					'newlines-between': 'always',
					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
					named: true,
				},
			],
		},
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
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
		files: [
			'**/testUtil/**/*.[jt]s?(x)',
			'**/__tests__/**/*.[jt]s?(x)',
			'**/?(*.)+(spec|test).[jt]s?(x)',
		],
		extends: [
			testingLibrary.configs['flat/react'],
			jest.configs['flat/recommended'],
			jest.configs['flat/style'],
		],
	},
	{
		ignores: ['dist/', 'coverage/'],
	},
);
