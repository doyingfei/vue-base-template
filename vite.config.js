import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import UnoCSS from 'unocss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    UnoCSS()
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 可选：在这里配置 Less 全局变量（如果需要）
        modifyVars: {
          // 例如改变 Ant Design 默认主题
          'primary-color': '#1DA57A',
        },
        javascriptEnabled: true,  // 允许在 Less 中使用 JavaScript 代码
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
