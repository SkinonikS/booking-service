variable "repository_full_name" {
  description = "The full name of the GitHub repository (e.g. my-org/repo)"
  type        = string
}

variable "environment" {
  description = "The name of the GitHub Actions environment to create"
  type        = string
}

variable "environment_variables" {
  description = "A map of environment variables to set in the GitHub Actions environment"
  type        = map(string)
}