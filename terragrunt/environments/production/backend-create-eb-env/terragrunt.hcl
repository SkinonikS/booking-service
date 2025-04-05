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

dependency "s3" {
  config_path = "../backend-create-versions-s3-bucket"

  mock_outputs = {
    bucket_name = "bucket"
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
    client_secret = "client"
  }
}

inputs = {
  eb_application_name = dependency.eb_app.outputs.eb_application_name

  vpc_id      = dependency.vpc.outputs.vpc_id
  ec2_subnets = dependency.vpc.outputs.public_subnet_ids

  service_role_arn     = dependency.eb_iam_roles.outputs.eb_service_role_arn
  instance_profile_arn = dependency.eb_iam_roles.outputs.eb_instance_profile_arn

  eb_bucket_name = dependency.s3.outputs.s3_bucket_name

  environment = include.env.locals.environment
  environment_variables = {
    APP_DEBUG = "false"
    # Database
    DB_CONNECTION = "pgsql"
    DB_HOST       = dependency.rds.outputs.db_host
    DB_PORT       = dependency.rds.outputs.db_port
    DB_DATABASE   = dependency.rds.outputs.db_name
    DB_USERNAME   = dependency.rds.outputs.username
    DB_PASSWORD   = dependency.rds.outputs.password
    # Cognito
    AUTH_GUARD                             = "cognito"
    AUTH_COGNITO_CLIENT_ID                 = dependency.cognito_user_pool_client.outputs.client_id
    AUTH_COGNITO_USER_POOL_BASE_URL        = dependency.cognito_user_pool.outputs.user_pool_url
    AUTH_COGNITO_USER_POOL_DOMAIN_BASE_URL = dependency.cognito_user_pool.outputs.user_pool_domain_url
  }
}