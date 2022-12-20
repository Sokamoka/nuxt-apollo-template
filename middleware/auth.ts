export default defineNuxtRouteMiddleware((to) => {
  const user = useCookie<{ role: string; id: string }>('user');
  if (!user.value?.id) return navigateTo('/sign-in');
  if (!Object.values(to.meta.role).includes(user.value?.role)) return navigateTo('/401');
});
