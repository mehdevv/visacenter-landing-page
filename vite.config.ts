import path from 'node:path'
import { fileURLToPath } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const projectRoot = path.dirname(fileURLToPath(import.meta.url))
const visaCentreRoot = path.resolve(projectRoot, '..')
const visaSrc = path.resolve(visaCentreRoot, 'src')
const reactPkg = path.resolve(projectRoot, 'node_modules/react')
const reactDomPkg = path.resolve(projectRoot, 'node_modules/react-dom')

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      '@': visaSrc,
      // Source lives under ../src so Node would pick ../node_modules/react — second copy breaks hooks (e.g. framer-motion).
      react: reactPkg,
      'react-dom': reactDomPkg,
    },
  },
  server: {
    fs: {
      allow: [visaCentreRoot, projectRoot],
    },
  },
})
