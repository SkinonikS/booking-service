include "root" {
  path = find_in_parent_folders("root.hcl")
}

include "env" {
  path           = find_in_parent_folders("env.hcl")
  expose         = true
  merge_strategy = "no_merge"
}

terraform {
  source = "../../../modules/php-eb-env"
}

dependency "eb_app" {
  config_path = "../../../common/backend-create-eb-app"

  mock_outputs = {
    app_id = "mock_app_id"
  }
}

dependency "vpc" {
  config_path = "../create-vpc"

  mock_outputs = {
    vpc_id            = "mock_vpc_id"
    public_subnet_ids = ["mock_public_subnet_ids"]
  }
}

dependency "eb_iam_roles" {
  config_path = "../../../common/create-eb-iam-roles"

  mock_outputs = {
    eb_service_role_arn     = "arn:aws:iam::123456789012:role/terraform-role"
    eb_instance_profile_arn = "arn:aws:iam::123456789012:role/terraform-role"
  }
}

dependency "eb_app" {
  config_path = "../../../common/backend-create-eb-app"

  mock_outputs = {
    eb_application_name = "Elastic Beanstalk"
  }
}

dependency "rds" {
  config_path = "../backend-create-rds"

  mock_outputs = {
    password = "password"
    username = "username"
    db_host  = "host"
    db_port  = 5432
    db_name  = "name"
  }
}

inputs = {
  eb_application_name = dependency.eb_app.outputs.eb_application_name

  vpc_id      = dependency.vpc.outputs.vpc_id
  ec2_subnets = dependency.vpc.outputs.public_subnet_ids

  service_role_arn     = dependency.eb_iam_roles.outputs.eb_service_role_arn
  instance_profile_arn = dependency.eb_iam_roles.outputs.eb_instance_profile_arn

  environment = include.env.locals.environment
  environment_variables = {
    APP_DEBUG = "false"

    DB_CONNECTION = "pgsql"
    DB_HOST       = dependency.rds.outputs.db_host
    DB_PORT       = dependency.rds.outputs.db_port
    DB_NAME       = dependency.rds.outputs.db_name
    DB_USER       = dependency.rds.outputs.username
    DB_PASSWORD   = dependency.rds.outputs.password
  }

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