// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  rootDir: './',
  ignore: ["apollo-server"],
  modules: ["@nuxtjs/apollo", "@nuxtjs/tailwindcss"],

  apollo: {
    clients: {
      default: {
        httpEndpoint: "http://localhost:4005/graphql",
        wsEndpoint: "ws://localhost:4005/graphql",
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
});
