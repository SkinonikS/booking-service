variable "user_pool_id" {
  description = "The ID of the user pool"
  type        = string
}

variable "name" {
  description = "The name of the client"
  type        = string
}

variable "callback_urls" {
  description = "The callback URLs for the web client"
  type        = list(string)
  default     = []
}

variable "logout_urls" {
  description = "The callback URLs for the web client"
  type        = list(string)
  default     = []
}

variable "identity_providers" {
  description = "The identity providers for the user pool client"
  type        = list(string)
  default     = []
}