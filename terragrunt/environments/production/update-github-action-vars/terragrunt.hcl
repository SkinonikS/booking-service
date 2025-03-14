include "root" {
  path = find_in_parent_folders("root.hcl")
}

include "env" {
  path           = find_in_parent_folders("env.hcl")
  expose         = true
  merge_strategy = "no_merge"
}

terraform {
  source = "../../../modules/github-action-vars"
}

dependency "amplify" {
  config_path = "../frontend-create-amplify-app"

  mock_outputs = {
    application_id = "app_id"
    branch_name    = "main"
  }
}

dependency "eb_app" {
  config_path = "../../../common/backend-create-eb-app"

  mock_outputs = {
    eb_application_name = "Elastic Beanstalk"
  }
}

dependency "s3" {
  config_path = "../backend-create-versions-s3-bucket"

  mock_outputs = {
    bucket_name = "bucket"
  }
}

locals {
  github_access_token = get_env("GITHUB_ACCESS_TOKEN")
}

inputs = {
  repository_full_name = "SkinonikS/booking-service"

  environment = include.env.locals.environment
  environment_variables = {
    # Elastic Beanstalk
    EB_ENV_NAME       = include.env.locals.environment
    EB_APP_NAME       = dependency.eb_app.outputs.eb_application_name
    EB_S3_BUCKET_NAME = dependency.s3.outputs.s3_bucket_name
    # Amplify
    AMPLIFY_APP_ID      = dependency.amplify.outputs.application_id
    AMPLIFY_BRANCH_NAME = dependency.amplify.outputs.branch_name
    # Terragrunt
    TF_ENV_NAME = include.env.locals.environment
  }

  github_access_token = local.github_access_token
}

generate "github_provider" {
  path      = "github_provider.tf"
  if_exists = "overwrite_terragrunt"
  contents  = <<EOF
provider "github" {
  token = var.github_access_token
}

variable "github_access_token" {
  description = "The GitHub access token to use for authenticating with the GitHub API"
  type        = string
}
EOF
}
