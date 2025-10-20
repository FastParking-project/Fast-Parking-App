import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  server: {
    // Permite que Vite acepte solicitudes de cualquier host,
    // incluyendo el dominio temporal que ngrok crea.
    // Solo debe usarse para desarrollo local.
    allowedHosts: ['.ngrok-free.dev'],
  },
})