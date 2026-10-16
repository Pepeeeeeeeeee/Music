import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

import { fileURLToPath, URL } from "url"

/**
 * Vite Config
 *
 * @see https://vitejs.dev/config/
 */
export default defineConfig({
	server: {
		port: 80,
		host: true
	},
	plugins: [vue()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url))
		}
	}
})
