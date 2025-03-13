include "root" {
  path = find_in_parent_folders("root.hcl")
}

include "env" {
  path           = find_in_parent_folders("env.hcl")
  expose         = true
  merge_strategy = "no_merge"
}

terraform {
  source = "../../../modules/rds"
}

dependency "vpc" {
  config_path = "../create-vpc"

  mock_outputs = {
    vpc_id            = "mock_vpc_id"
    vpc_cidr_block    = "10.0.0.0/16"
    public_subnet_ids = ["10.0.1.0/24"]
  }
}

inputs = {
  name = "Backend"

  username = "laravel"
  db_name  = "laravel"

  vpc_id         = dependency.vpc.outputs.vpc_id
  vpc_cidr_block = dependency.vpc.outputs.vpc_cidr_block
  subnet_ids     = dependency.vpc.outputs.public_subnet_ids

  environment = include.env.locals.environment
}
