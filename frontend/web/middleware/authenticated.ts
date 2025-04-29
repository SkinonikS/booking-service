export default defineNuxtRouteMiddleware(() => {
  const { loggedIn } = useOidcAuth();

  if (! loggedIn.value) {
    throw createError({ status: 401, message: 'Unauthorized', fatal: true });
  }
});
