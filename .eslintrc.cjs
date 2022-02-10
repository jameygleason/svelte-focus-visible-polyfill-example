/* eslint-disable import/no-commonjs */
const fs = require("fs")
const path = require("path")

const schemaPath = path.join(process.cwd(), "api", "src", "node_modules", "@tempo", "typeDefs.js")
let schemaString = ""
if (schemaPath) {
	schemaString = fs.readFileSync(schemaPath, "utf-8").replace("export const typeDefs = `", "").replace("`", "")
}

/** @type {import('eslint').Linter.Config} */
module.exports = {
	root: true,
	env: {
		es2021: true,
		browser: true,
		node: true,
	},
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2021,
		sourceType: "module",
		allowImportExportEverywhere: true, // dynamic import
		requireConfigFile: false,
	},
	extends: ["standard", "eslint:recommended", "plugin:@typescript-eslint/recommended"],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly",
		self: true,
		caches: true,
		fetch: true,
		$$props: "writable",
		$$restProps: "writable",
	},
	plugins: ["svelte3", "@typescript-eslint", "node", "import", "json", "graphql"],
	ignorePatterns: ["*.cjs"],
	overrides: [
		{
			files: ["**/*.svelte"],
			processor: "svelte3/svelte3",
			rules: {
				"@typescript-eslint/no-unused-vars": 0,
				"comma-dangle": 0,
				"import/extensions": 0,
				"import/first": 0,
				"import/no-duplicates": 0,
				"import/no-extraneous-dependencies": 0,
				"import/no-mutable-exports": 0,
				"import/no-unresolved": 0,
				"import/order": 0,
				// "no-multiple-empty-lines": ["error", { max: 1, maxBOF: 2, maxEOF: 0 }], // maxBOF is to fix for files that lead with a script block
				"no-multiple-empty-lines": 0,
				"no-use-before-define": 0,
			},
		},
		{
			files: ["*.ts", "*.tsx"],
			rules: {
				"@typescript-eslint/explicit-module-boundary-types": ["error"],
			},
		},
		{
			files: ["*.js", "*.jsx", "*.svelte"],
			rules: {
				"@typescript-eslint/explicit-module-boundary-types": ["off"],
			},
		},
	],
	settings: {
		"svelte3/typescript": () => require("typescript"),
		"svelte3/ignore-styles": () => true,
		"import/resolver": {
			alias: {
				map: [["$app", "./.svelte-kit/dev/runtime/app"]],
				extensions: [".js", ".ts", ".svelte"],
			},
		},
	},
	rules: {
		// ENV Specific
		"graphql/template-strings": [
			"error",
			{
				env: "literal",
				tagName: "gql",
				schemaString: schemaString || "",
			},
		],
		// END

		"@typescript-eslint/ban-ts-comment": 0,
		"@typescript-eslint/no-explicit-any": 0,
		camelcase: 0,
		"comma-dangle": ["error", "always-multiline"],
		"import/default": "error",
		"import/export": "error",
		"import/extensions": [
			"error",
			{
				ignorePackages: true,
				pattern: {
					js: "always",
					ts: "never", // Should be set to always. Prevented by Typescript error.
				},
			},
		],
		"import/first": "error",
		"import/named": "error",
		"import/namespace": "error",
		"import/newline-after-import": ["error", { count: 1 }],
		"import/no-anonymous-default-export": [
			2,
			{
				allowArray: true,
				allowObject: true,
			},
		],
		"import/no-commonjs": 2,
		"import/no-cycle": [2, { ignoreExternal: true }],
		"import/no-deprecated": "error",
		"import/no-duplicates": "error",
		"import/no-extraneous-dependencies": "error",
		"import/no-internal-modules": 0,
		"import/no-mutable-exports": "error",
		"import/no-named-as-default-member": "error",
		"import/no-named-as-default": "error",
		"import/no-named-default": "error",
		"import/no-self-import": "error",
		"import/no-unresolved": [
			2,
			{
				ignore: ["app", "$app"],
			},
		],
		"import/no-unused-modules": "error",
		"import/no-useless-path-segments": "error",
		"import/order": "error",
		indent: "off", // Fix conflict with Prettier
		"keyword-spacing": [
			"error",
			{
				after: true,
				before: true,
			},
		],
		"linebreak-style": ["error", "unix"],
		"node/no-deprecated-api": [
			"error",
			{
				version: ">=14.0.0",
				ignoreModuleItems: [],
				ignoreGlobalItems: [],
			},
		],
		"no-fallthrough": 1,
		"no-inner-declarations": 1,
		"no-labels": "error",
		"no-mixed-operators": 1,
		"no-multi-spaces": "error",
		"no-multiple-empty-lines": ["error", { max: 1, maxBOF: 0, maxEOF: 0 }],
		"no-restricted-syntax": ["error", "LabeledStatement"],
		"no-self-assign": "error",
		"no-sequences": 0,
		"no-tabs": 0,
		"no-undef": "error",
		"no-unused-labels": "error",
		"no-unexpected-multiline": "error",
		"no-unreachable": "warn",
		"no-unused-vars": [
			"error",
			{
				argsIgnorePattern: "^_|req|res|next|args|ctx|__",
				varsIgnorePattern: "^_|req|res|next|args|ctx|__",
			},
		],
		"no-use-before-define": "error",
		"no-var": "error",
		"object-shorthand": ["error", "always"],
		"padded-blocks": 1,
		"prefer-const": 0,
		semi: ["error", "never"],
		"space-before-function-paren": [
			"error",
			{
				anonymous: "always",
				named: "never",
				asyncArrow: "always",
			},
		],
		"spaced-comment": [
			"error",
			"always",
			{
				line: {
					markers: ["!", "?", "*", "/"],
					exceptions: ["-", "*"],
				},
				block: {
					markers: ["!", "?", "*"],
					exceptions: ["-", "*"],
					balanced: true,
				},
			},
		],
		quotes: [
			"error",
			"double",
			{
				avoidEscape: true,
			},
		],
	},
}
