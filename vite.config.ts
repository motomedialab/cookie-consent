import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import banner from 'vite-plugin-banner';
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

import pkg from './package.json';


// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        cssInjectedByJsPlugin(),
        banner(`/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`)
    ],
    build: {
        rollupOptions: {
            output: {
                entryFileNames: `[name].js`,
                chunkFileNames: `[name].js`,
                assetFileNames: `[name].[ext]`,
                banner: '/* Copyright 2023 MotoMediaLab - https://www.npmjs.com/package/@motomedialab/cookie-consent */',
                footer: '/* Copyright 2023 MotoMediaLab - https://www.npmjs.com/package/@motomedialab/cookie-consent */',
            }
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
