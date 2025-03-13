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