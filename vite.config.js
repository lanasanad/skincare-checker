import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

console.log("API Key in config:", process.env.VITE_API_KEY)

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_API_KEY': JSON.stringify(process.env.VITE_API_KEY)
  }
})