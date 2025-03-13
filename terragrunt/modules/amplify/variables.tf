variable "name" {
  description = "The name of the Amplify app"
  type        = string
}

variable "environment" {
  description = "The environment of the Amplify app"
  type        = string
  default     = "development"
}

variable "environment_variables" {
  description = "The environment variables for the Amplify app"
  type        = map(string)
  default     = {}
}

variable "repository" {
  description = "The repository of the Amplify app"
  type        = string
}

variable "basic_auth_credentials" {
  description = "The basic auth credentials for the Amplify app"
  type        = string
}

variable "app_root" {
  description = "The app root of the Amplify app"
  type        = string
  default     = "/"
}

variable "branch_name" {
  description = "The branch name of the Amplify app"
  type        = string
  default     = "main"
}

variable "github_access_token" {
  description = "GitHub access token."
  type        = string
}

variable "stage" {
  description = "The stage of the Amplify app"
  type        = string
  default     = "PRODUCTION"
}

variable "framework" {
  description = "The framework of the Amplify app"
  type        = string
  default     = "Nuxt"
}