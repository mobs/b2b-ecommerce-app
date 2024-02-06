import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy: {
      // '/api': 'http://localhost:5000',
      '/api': 'https://ecommerce-app-o8uo.onrender.com/'
    }
    
  },
  plugins: [react()],
})
