terraform {
  required_version = "~> 1.11"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.89"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.7"
    }
    github = {
      source  = "integrations/github"
      version = "~> 6.6"
    }
  }
}