variable "name" {
  description = "The name of the RDS instance."
  type        = string
}

variable "environment" {
  description = "The environment."
  type        = string
  default     = "development"
}

variable "username" {
  description = "The username for the database."
  type        = string
  default     = "root"
}

variable "db_name" {
  description = "The name of the database."
  type        = string
  default     = "mydb"
}

variable "vpc_id" {
  description = "The ID of the VPC in which to place the RDS instance."
  type        = string
}

variable "vpc_cidr_block" {
  description = "The CIDR block of the VPC in which to place the RDS instance."
  type        = string
}

variable "subnet_ids" {
  description = "The IDs of the subnets in which to place the RDS instance."
  type        = list(string)
}
