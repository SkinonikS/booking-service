data "github_repository" "this" {
  full_name = var.repository_full_name
}

resource "github_repository_environment" "this" {
  repository  = data.github_repository.this.name
  environment = var.environment

  lifecycle {
    create_before_destroy = true
  }
}

resource "github_actions_environment_variable" "this" {
  for_each = var.environment_variables

  environment = github_repository_environment.this.environment
  repository  = data.github_repository.this.name

  variable_name = each.key
  value         = each.value

  lifecycle {
    create_before_destroy = true
  }
}