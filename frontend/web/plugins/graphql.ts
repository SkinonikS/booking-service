export default defineNuxtPlugin((nuxtApp) => {
  const runtimeConfig = useRuntimeConfig(
    nuxtApp.ssrContext?.event,
  );

  const { $graphql } = useNuxtApp();
  const { loggedIn, user } = useOidcAuth();

  if (loggedIn && user.value?.idToken) {
    $graphql.default.setHeaders({ Authorization: `Bearer ${user.value.idToken}` });
  }

  $graphql.default.setEndpoint(`${runtimeConfig.public.graphql.baseUrl}/graphql`);
});
