resource "aws_cognito_user_pool" "this" {
  name = var.user_pool_name

  mfa_configuration = "OPTIONAL"

  username_attributes      = ["email"]
  auto_verified_attributes = ["email"]

  schema {
    name                = "email"
    attribute_data_type = "String"
    required            = true
    mutable             = true
  }

  schema {
    name                = "name"
    attribute_data_type = "String"
    required            = true
    mutable             = true
  }

  user_attribute_update_settings {
    attributes_require_verification_before_update = ["email"]
  }

  username_configuration {
    case_sensitive = false
  }

  device_configuration {
    challenge_required_on_new_device      = true
    device_only_remembered_on_user_prompt = false
  }

  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
    require_uppercase = true
  }

  software_token_mfa_configuration {
    enabled = true
  }
}

resource "aws_cognito_identity_provider" "google" {
  user_pool_id  = aws_cognito_user_pool.this.id
  provider_name = "Google"
  provider_type = "Google"

  provider_details = {
    client_id        = var.google_client_id
    client_secret    = var.google_client_secret
    authorize_scopes = "openid email profile"
  }

  attribute_mapping = {
    name  = "name"
    email = "email"
  }
}

resource "aws_cognito_user_pool_domain" "this" {
  user_pool_id = aws_cognito_user_pool.this.id
  domain       = lower(replace(aws_cognito_user_pool.this.id, "_", "-"))
}

data "aws_region" "current" {}
