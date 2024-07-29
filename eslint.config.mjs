import js from '@eslint/js'
import prettierPlugin from 'eslint-plugin-prettier'
import {
	default as eslintReact,
	default as pluginReact,
} from 'eslint-plugin-react'
import eslintReactHooks from 'eslint-plugin-react-hooks'
import eslintReactRefresh from 'eslint-plugin-react-refresh'

import eslintConfigPrettier from 'eslint-config-prettier'
import globals from 'globals'

export default [
	{
		plugins: {
			react: eslintReact,
			'react-hooks': eslintReactHooks,
			'react-refresh': eslintReactRefresh,
			prettier: prettierPlugin,
		},
	},
	{ files: ['**/*.{js,mjs,cjs,jsx}'] },
	{
		ignores: ['dist', 'node_modules'],
	},
	js.configs.recommended,
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node, ...globals.es2021 },

			parserOptions: eslintReact.configs.recommended.parserOptions,
		},
	},
	js.configs.recommended,
	pluginReact.configs.flat.recommended,
	{
		rules: {
			...eslintConfigPrettier.rules,
			'prefer-const': 'error',
			'react/react-in-jsx-scope': 'off',
			'react/jsx-curly-brace-presence': [
				'warn',
				{ props: 'never', children: 'never' },
			],
			'react/function-component-definition': [
				'warn',
				{ namedComponents: 'arrow-function' },
			],
			'react/self-closing-comp': [
				'error',
				{ component: true, html: true },
			],
			'react/prop-types': 'off',
		},
	},
]
