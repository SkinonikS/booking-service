export default defineNuxtRouteMiddleware((to, from) => {
  const { loggedIn } = useOidcAuth();

  if (! loggedIn.value) {
    throw createError({ status: 401, message: 'Unauthorized' });
  }
});
