variable "name" {
  description = "The name of the Elastic Beanstalk application."
  type        = string
}

variable "description" {
  description = "The description of the Elastic Beanstalk application."
  type        = string
  default     = ""
}

variable "appversion_lifecycle_service_role_arn" {
  description = "The ARN of the IAM service role."
  type        = string
}