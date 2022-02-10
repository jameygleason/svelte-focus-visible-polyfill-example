import adapter from "@sveltejs/adapter-node"
import preprocess from "svelte-preprocess"
import postcssPresetEnv from "postcss-preset-env"

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		scss: {
			sourceMap: true,
		},
		postcss: {
			plugins: [
				postcssPresetEnv({
					stage: 2,
					autoprefixer: false,
					features: {
						"logical-properties-and-values": false,
						"matches-pseudo-class": false,
						// "focus-visible-pseudo-class": false,
					},
				}),
			],
			sourceMap: true,
		},
	}),

	kit: {
		adapter: adapter(),

		// Override http methods in the Todo forms
		methodOverride: {
			allowed: ["PATCH", "DELETE"],
		},
		vite: () => ({
			clearScreen: false,
		}),
	},
}

export default config
