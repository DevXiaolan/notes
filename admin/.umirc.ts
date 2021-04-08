import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
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
