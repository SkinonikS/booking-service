include "root" {
  path = find_in_parent_folders("root.hcl")
}

include "env" {
  path           = find_in_parent_folders("env.hcl")
  expose         = true
  merge_strategy = "no_merge"
}

terraform {
  source = "../../../modules/cognito-user-pool"
}

inputs = {
  google_client_id     = get_env("GOOGLE_CLIENT_ID", "")
  google_client_secret = get_env("GOOGLE_CLIENT_SECRET", "")
}
