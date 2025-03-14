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
}
