import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Relative base so the build works both on GitHub Pages (/motivation101/)
  // and later on the custom domain (theebigjoe.fit) at the root.
  base: './',
  plugins: [react()],
})
