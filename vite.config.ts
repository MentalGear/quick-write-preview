import path from "path"
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte"

export default defineConfig({
    // ... other options
    resolve: {
        alias: {
            $lib: path.resolve("./src/lib"),
        },
    },

    svelte: { vite: { preprocess: [vitePreprocess()] } },
})
