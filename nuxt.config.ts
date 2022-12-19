// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  rootDir: './',
  ignore: ['apollo-server'],
  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore', // import { defineStore } from 'pinia'
        ],
      },
    ],
  ],
  alias: {
    pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs',
    // process.env.NODE_ENV === 'production'
    //   ? '/node_modules/pinia/dist/pinia.mjs'
    //   : '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs',
  },

  apollo: {
    clients: {
      default: {
        httpEndpoint: 'http://localhost:4005/graphql',
        wsEndpoint: 'ws://localhost:4005/graphql',
        httpLinkOptions: {
          credentials: 'same-origin',
        },

        defaultOptions: {
          watchQuery: {
            fetchPolicy: 'cache-and-network',
          },
        },
      },
    },
  },
  css: ['@/assets/css/main.css'],
});
