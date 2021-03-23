import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    '/api/': {
      target: 'http://localhost:3002/',
      pathRewrite: { '^/api' : '' },
      changeOrigin: true,
    },
  },
  esbuild: {},
  routes: [
    {
      path: '/',
      wrappers: ['@/layouts'],
      component: '@/pages/index',
    },
  ],
});
