// const userStore = useUserStore();
// import { useLocalStorage } from '@vueuse/core';

export default defineNuxtRouteMiddleware((to) => {
  // const app = useNuxtApp();
  // console.log(app.$pinia);
  // const userStore = useUserStore();
  // const user = useLocalStorage('user', {});
  // console.log('process:', process.client);
  return navigateTo('/401');
  if (process.client) {
    const userX = window.localStorage.getItem('user');
    console.log(JSON.parse(userX));
    const user = JSON.parse(userX);

    // const user = userStore.getUser;
    console.log(user?.role, to.meta.role);
    if (!user?.id) return navigateTo('/sign-in');
    if (!Object.values(to.meta.role).includes(user.role)) return navigateTo('/401');
    // return navigateTo(to.path);
  }
});
