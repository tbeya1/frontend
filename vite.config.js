import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    'process.env': {
      VITE_APP_BACKEND_URL: process.env.NODE_ENV === 'production'
        ? 'https://finalweb-6lny.onrender.com' //  production backend URL
        : 'http://localhost:9999', //  local development
    },
  },
});
