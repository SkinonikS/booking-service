variable "env" {
  type        = string
  description = "The environment name"
  default     = "dev"
}

variable "name" {
  type        = string
  description = "The name of the VPC"
  default     = ""
}

variable "cidr_block" {
  type        = string
  description = "The CIDR block for the VPC"
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  type        = list(string)
  description = "The availability zones for the VPC"
  default     = []
}

variable "public_subnets" {
  type        = list(string)
  description = "The CIDR blocks for the public subnets"
  default     = []
}

variable "public_subnet_suffix" {
  type        = string
  description = "The suffix for the public subnets"
  default     = "Public"
}

variable "enable_dns_hostnames" {
  type        = bool
  description = "Should be true to enable DNS hostnames in the VPC"
  default     = false
}

variable "enable_dns_support" {
  type        = bool
  description = "Should be true to enable DNS support in the VPC"
  default     = true
}

variable "map_public_ip_on_launch" {
  type        = bool
  description = "Should be true to enable public IP mapping on launch"
  default     = false
}