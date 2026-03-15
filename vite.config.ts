import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import Components from 'unplugin-vue-components/vite';
import { functionsScanner, copyFile } from "wpsjs/vite_plugins";

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    Components({
      resolvers: [PrimeVueResolver()]
    }),
    copyFile({ src: 'manifest.xml', dest: 'manifest.xml', }),
    copyFile({ src: 'ribbon.xml', dest: 'ribbon.xml', }),
    functionsScanner({
      inputJsPath: 'src/utils/functions.ts',
      outputJsonPath: 'functions.json',
      namespace: 'HelloEt',
    }),
  ],
  css: {
    transformer: 'lightningcss',
  },
  build: {
    cssTarget: ['chrome104'],
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3889
  }
})