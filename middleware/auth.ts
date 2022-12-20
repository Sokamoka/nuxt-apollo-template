import { User } from '../types';

export default defineNuxtRouteMiddleware((to) => {
  const user = useCookie<User>('user');
  if (!user.value?.id) return navigateTo('/sign-in');
  if (!Object.values(to.meta.role as string).includes(user.value?.role)) return navigateTo('/401');
});
