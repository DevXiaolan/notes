import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  esbuild: {},
  routes: [
    {
      path: '/',
      component: '@/layouts',
      routes: [
        {
          path: '/',
          exact: true,
          component: './index',
        },
        {
          path: '/keyword',
          exact: true,
          component: './keyword',
        },
        {
          component: './not-found',
        },
      ],
    },
  ],
});
