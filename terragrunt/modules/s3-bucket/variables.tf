variable "s3_bucket_name_suffix" {
  description = "The suffix to append to the S3 bucket name"
  type        = string
  default     = "backend-versions"
}

variable "environment" {
  description = "The environment to deploy to"
  type        = string
  default     = "dev"
}
