locals {
  name        = lower(var.name)
  environment = lower(var.environment)
}

resource "aws_amplify_app" "this" {
  name       = var.name
  repository = "https://github.com/${var.repository}"
  platform   = "WEB_COMPUTE"

  access_token = var.github_access_token

  build_spec = <<EOF
version: 1
applications:
  - frontend:
      phases:
        preBuild:
          commands:
            - corepack enable
            - npx --yes nypm i
        build:
          commands:
            - pnpm run build
      artifacts:
        baseDirectory: .amplify-hosting
        files:
          - '**/*'
    appRoot: ${var.app_root}
EOF

  enable_basic_auth      = true
  basic_auth_credentials = base64encode(var.basic_auth_credentials)

  environment_variables = merge(var.environment_variables, {
    ENV = local.environment
    # Session
    NUXT_OIDC_SESSION_SECRET = random_string.oidc_session_secret.result
    NUXT_AUTH_SESSION_SECRET = random_string.auth_session_secret.result
    NUXT_OIDC_TOKEN_KEY      = "data:base64,${random_id.oidc_token_key.b64_std}"
    # Cognito
    NUXT_OIDC_PROVIDERS_COGNITO_REDIRECT_URI        = "http://localhost:3000" // Temporary
    NUXT_OIDC_PROVIDERS_COGNITO_LOGOUT_REDIRECT_URI = "http://localhost:3000" // Temporary
  })

  tags = {
    Environment = local.environment
  }
}

resource "aws_amplify_branch" "this" {
  app_id      = aws_amplify_app.this.id
  branch_name = var.branch_name

  enable_auto_build = false

  framework = var.framework
  stage     = var.stage

  tags = {
    Environment = local.environment
  }
}

resource "random_id" "oidc_token_key" {
  byte_length = 32
}

resource "random_string" "auth_session_secret" {
  length  = 48
  special = true
  upper   = true
  lower   = true
  numeric = true
}

resource "random_string" "oidc_session_secret" {
  length  = 48
  special = true
  upper   = true
  lower   = true
  numeric = true
}