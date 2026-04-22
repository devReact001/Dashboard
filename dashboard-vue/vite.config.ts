import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      include: [/\.vue$/, /\.Vue$/],  // ✅ treat both .vue and .Vue as Vue files
    }),
  ],
})