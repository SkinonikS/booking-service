include "root" {
  path = find_in_parent_folders("root.hcl")
}

include "env" {
  path           = find_in_parent_folders("env.hcl")
  expose         = true
  merge_strategy = "no_merge"
}

terraform {
  source = "../../../modules/amplify"
}

dependency "eb_env" {
  config_path = "../backend-create-eb-env"

  mock_outputs = {
    cname = "cname"
  }
}

dependency "cognito_user_pool" {
  config_path = "../create-cognito-user-pool"

  mock_outputs = {
    user_pool_url        = "https://example2.com"
    user_pool_domain_url = "https://example.com"
  }
}

dependency "cognito_user_pool_client" {
  config_path = "../create-cognito-user-pool-client"

  mock_outputs = {
    client_id     = "client_id"
    client_secret = "client_secret"
  }
}

inputs = {
  name        = "frontend"
  environment = include.env.locals.environment

  app_root               = "frontend/web"
  basic_auth_credentials = "root:naoyuki123"

  repository          = "SkinonikS/booking-service"
  github_access_token = local.github_access_token

  environment_variables = {
    # API
    NUXT_API_BASE_URL = dependency.eb_env.outputs.eb_cname,
    # Cognito
    NUXT_OIDC_PROVIDERS_COGNITO_CLIENT_ID     = dependency.cognito_user_pool_client.outputs.client_id,
    NUXT_OIDC_PROVIDERS_COGNITO_CLIENT_SECRET = dependency.cognito_user_pool_client.outputs.client_secret,
    NUXT_OIDC_PROVIDERS_COGNITO_BASE_URL      = dependency.cognito_user_pool.outputs.user_pool_domain_url,
  }
}

locals {
  github_access_token = get_env("GITHUB_ACCESS_TOKEN")
}
