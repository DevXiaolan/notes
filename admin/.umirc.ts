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
          path: '/record',
          exact: true,
          component: './record',
        },
        {
          path: '/keyword',
          exact: true,
          component: './keyword',
        },
        {
          path: '/black',
          exact: true,
          component: './black',
        },
        {
          component: './not-found',
        },
      ],
    },
  ],
});
