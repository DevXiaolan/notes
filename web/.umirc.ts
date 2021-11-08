import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  esbuild: {},
  routes: [
    {
      path: '/',
      wrappers: ['@/layouts'],
      component: '@/pages/index',
    },
  ],
});
