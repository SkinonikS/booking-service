include "root" {
  path = find_in_parent_folders("root.hcl")
}

include "env" {
  path           = find_in_parent_folders("env.hcl")
  expose         = true
  merge_strategy = "no_merge"
}

terraform {
  source = "../../../modules/s3-bucket"
}

inputs = {
  s3_bucket_name_suffix = "${include.env.locals.environment}-backend-versions"

  # github_access_token = local.github_access_token
}

# locals {
#   github_access_token = get_env("GITHUB_ACCESS_TOKEN")
# }

# generate "providers" {
#   path      = "providers.tf"
#   if_exists = "overwrite_terragrunt"
#   contents  = <<EOF
# provider "github" {
#   token = var.github_access_token
# }

# variable "github_access_token" {
#   description = "GitHub access token."
#   type = string
# }
# EOF
# }