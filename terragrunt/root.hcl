locals {
  remote_state_bucket_region = "eu-north-1"
  remote_state_bucket        = "396608814220-terraform-state"

  aws_region            = get_env("AWS_REGION")
  aws_access_key_id     = get_env("AWS_ACCESS_KEY_ID")
  aws_secret_access_key = get_env("AWS_SECRET_ACCESS_KEY")
}

remote_state {
  backend = "s3"
  generate = {
    path      = "backend.tf"
    if_exists = "overwrite_terragrunt"
  }
  config = {
    region       = local.remote_state_bucket_region
    bucket       = local.remote_state_bucket
    key          = "${path_relative_to_include()}/terraform.tfstate"
    encrypt      = true
    use_lockfile = true
  }
}

generate "aws_provider" {
  path      = "aws_provider.tf"
  if_exists = "overwrite_terragrunt"
  contents  = <<EOF
provider "aws" {
  region = var.aws_region
  access_key = var.aws_access_key_id
  secret_key = var.aws_secret_access_key
}

variable "aws_region" {
  description = "The AWS region to deploy resources."
  type = string
}

variable "aws_access_key_id" {
  description = "The AWS access key to deploy resources."
  type = string
}

variable "aws_secret_access_key" {
  description = "The AWS secret key to deploy resources."
  type = string
}
EOF
}

inputs = {
  aws_region            = local.aws_region
  aws_access_key_id     = local.aws_access_key_id
  aws_secret_access_key = local.aws_secret_access_key
}
