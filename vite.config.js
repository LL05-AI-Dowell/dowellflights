import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8007,
  },
  plugins: [react()],
  base: '/dowellflight/'
})