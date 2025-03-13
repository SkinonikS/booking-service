variable "eb_application_name" {
  type        = string
  description = "The Elastic Beanstalk application name"
}

variable "environment" {
  type        = string
  description = "The environment name"
  default     = "dev"
}

variable "environment_variables" {
  type        = map(string)
  description = "The environment variables for the Elastic Beanstalk application"
  default     = {}
}

variable "solution_stack_name" {
  type        = string
  description = "The solution stack name for the Elastic Beanstalk application"
  default     = "64bit Amazon Linux 2023 v4.5.1 running PHP 8.4"
}

variable "vpc_id" {
  type        = string
  description = "The VPC ID for the Elastic Beanstalk application"
}

variable "ec2_instance_types" {
  type        = list(string)
  description = "The EC2 instance type for the Elastic Beanstalk application"
  default     = ["t3.micro"]
}

variable "ec2_subnets" {
  type        = list(string)
  description = "The VPC subnets for the Elastic Beanstalk application"
}

variable "service_role_arn" {
  type        = string
  description = "The service role ARN for the Elastic Beanstalk application"
}

variable "instance_profile_arn" {
  type        = string
  description = "The instance profile ARN for the Elastic Beanstalk application"
}
