
export default defineNitroPlugin((nitro) => {
  const runtimeConfig = useRuntimeConfig();
  
  // This is a dirty hack to set the session secrets for the OIDC plugin
  // Because for some reason aws amplify doesn't pass env variables to the server at runtime, only at build time
  // So we have to set them manually here, beacuse `oidc` plugin doesn't have a way to set them at runtime
  process.env.NUXT_OIDC_SESSION_SECRET = runtimeConfig.oidc_secrets.oidc_session_secret;
  process.env.NUXT_OIDC_TOKEN_KEY = runtimeConfig.oidc_secrets.oidc_token_key;
  process.env.NUXT_OIDC_AUTH_SESSION_SECRET = runtimeConfig.oidc_secrets.oidc_auth_session_secret;
});
