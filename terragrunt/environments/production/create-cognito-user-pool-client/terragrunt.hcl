include "root" {
  path = find_in_parent_folders("root.hcl")
}

include "env" {
  path           = find_in_parent_folders("env.hcl")
  expose         = true
  merge_strategy = "no_merge"
}

terraform {
  source = "../../../modules/cognito-user-pool-client"
}

dependency "cognito_user_pool" {
  config_path = "../create-cognito-user-pool"

  mock_outputs = {
    user_pool_id = "mock_user_pool_id"
  }
}

inputs = {
  user_pool_id = dependency.cognito_user_pool.outputs.user_pool_id

  name               = "OAuth2 Client"
  callback_urls      = ["http://localhost"]
  logout_urls        = ["http://localhost"]
  identity_providers = ["Google"]
}
