export default defineNuxtRouteMiddleware(() => {
  const { loggedIn, user } = useOidcAuth();

  if (! loggedIn.value) {
    throw createError({ status: 401, message: 'Unauthorized', fatal: true });
  }

  if (user?.value?.userInfo?.['custom:is_verified'] !== 'true') {
    throw createError({ status: 403, message: 'Forbidden', fatal: true });
  }
});
