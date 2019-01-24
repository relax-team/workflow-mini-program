module.exports = {
	root: true,
	env: {
		es6: true,
		node: true
	},
	extends: 'eslint:recommended',
    parser: 'babel-eslint',
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module'
	},
	rules: {
		indent: ['error', 4],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'no-console': 'off',
        'no-unused-vars': 'off'
	},
	globals: {
		getApp: false,
		Page: false,
		wx: false,
		App: false,
		getCurrentPages: false,
		Component: false
	}
};
