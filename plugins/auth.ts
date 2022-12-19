import { useUserStore } from '../composables/useUserStore';

export default defineNuxtPlugin(() => {
  addRouteMiddleware('auth-test', (to, from) => {
    console.log('this named middleware was added in a plugin');
    // const { clients } = useApollo();
    // console.log({ clients });
    // const { $pinia } = useNuxtApp();
    const userStore = useUserStore();
    console.log(userStore.getUser, from);
    const user = userStore.getUser;
    if (!user?.id) return navigateTo('/sign-in');
    if (!Object.values(to.meta.role).includes(user.role)) return navigateTo('/401');
  });
});
