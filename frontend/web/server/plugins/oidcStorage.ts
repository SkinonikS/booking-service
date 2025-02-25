import redisDriver from 'unstorage/drivers/redis';

export default defineNitroPlugin(() => {
  const storage = useStorage();

  const runtimeConfig = useRuntimeConfig();
  const driver = redisDriver({
    base: 'redis',
    host: runtimeConfig.oidc_storage.redis.host,
    port: runtimeConfig.oidc_storage.redis.port,
    password: runtimeConfig.oidc_storage.redis.password,
    db: runtimeConfig.oidc_storage.redis.db,
  });

  storage.mount('redis', driver);
});
