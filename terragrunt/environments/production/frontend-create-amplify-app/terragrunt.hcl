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

inputs = {
  name        = "frontend"
  environment = include.env.locals.environment

  app_root               = "frontend/web"
  basic_auth_credentials = "root:naoyuki123"

  repository          = "SkinonikS/booking-service"
  github_access_token = local.github_access_token

  environment_variables = {
    NUXT_API_BASE_URL = dependency.eb_env.outputs.eb_cname
  }
}

locals {
  github_access_token = get_env("GITHUB_ACCESS_TOKEN")
}
