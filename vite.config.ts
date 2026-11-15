import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages serves this repository from /StartupHelper/.
  // If the repository is renamed, update this path to match its name.
  base: '/StartupHelper/',
  plugins: [react()],
})
