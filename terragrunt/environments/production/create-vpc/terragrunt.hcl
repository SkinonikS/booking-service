include "root" {
  path = find_in_parent_folders("root.hcl")
}

include "env" {
  path           = find_in_parent_folders("env.hcl")
  expose         = true
  merge_strategy = "no_merge"
}

terraform {
  source = "../../../modules/vpc"
}

inputs = {
  name = "Laravel"

  cidr_block         = "10.0.0.0/16"
  availability_zones = ["eu-north-1a", "eu-north-1b", "eu-north-1c"]
  public_subnets     = ["10.0.0.0/24", "10.0.1.0/24", "10.0.2.0/24"]

  enable_dns_hostnames = true
  enable_dns_support   = true

  map_public_ip_on_launch = true

  environment = include.env.locals.environment
}
