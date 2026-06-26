import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'gcp-pca-guide' with your actual GitHub repo name
export default defineConfig({
  plugins: [react()],
  base: '/gcp_pca/',
})
