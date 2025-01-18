import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import wasm from 'vite-plugin-wasm'

export default defineConfig({
  plugins: [
    wasm(),
    svelte({
      compilerOptions: {
        runes: true,
        compatibility: {
          componentApi: 4
        }
      }
    })
  ],
  optimizeDeps: {
    include: ['gun'],
    exclude: [
      '@automerge/automerge',
      'helia',
      '@helia/unixfs'
    ]
  },
  build: {
    target: 'esnext'
  }
})
