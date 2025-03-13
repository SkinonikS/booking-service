include "root" {
  path = find_in_parent_folders("root.hcl")
}

terraform {
  source = "../../modules/eb-app"
}

dependency "eb_iam_roles" {
  config_path = "../create-eb-iam-roles"

  mock_outputs = {
    eb_service_role_arn     = "arn:aws:iam::123456789012:role/terraform-role"
    eb_instance_profile_arn = "arn:aws:iam::123456789012:role/terraform-role"
  }
}

inputs = {
  name        = "Backend-API"
  description = "Elastic Beanstalk application for the backend API"

  appversion_lifecycle_service_role_arn = dependency.eb_iam_roles.outputs.eb_service_role_arn
}
