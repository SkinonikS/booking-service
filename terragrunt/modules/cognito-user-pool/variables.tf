variable "google_client_id" {
  description = "Google OAuth2 client ID"
  type        = string
}

variable "google_client_secret" {
  description = "Google OAuth2 client secret"
  type        = string
}

variable "environment" {
  description = "The environment name"
  type        = string
  default     = "dev"
}

variable "user_pool_name" {
  description = "The name of the user pool"
  type        = string
  default     = "cognito-user-pool"
}
