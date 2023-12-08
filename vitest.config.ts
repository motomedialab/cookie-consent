import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {InlineConfig} from "vitest";

const config: InlineConfig = {
    globals: true,
    environment: 'happy-dom',
}

export default defineConfig({
    plugins: [vue()],
    test: config,
})