locals {
  eb_application_name = lower(var.eb_application_name)
  environment         = lower(var.environment)
}

# Security group for EC2 instances
resource "aws_security_group" "asg" {
  name        = "eb-${local.environment}-${local.eb_application_name}-sg"
  description = "Security group for Elastic Beanstalk EC2 instances"

  vpc_id = var.vpc_id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Environment = local.environment
  }
}

resource "random_string" "app_key" {
  length  = 32
  special = false
}

# Elastic Beanstalk environment
resource "aws_elastic_beanstalk_environment" "this" {
  name = local.environment

  application         = var.eb_application_name
  solution_stack_name = var.solution_stack_name

  # EC2 vpc settings
  setting {
    namespace = "aws:ec2:vpc"
    name      = "VPCId"
    value     = var.vpc_id
  }

  setting {
    namespace = "aws:ec2:vpc"
    name      = "Subnets"
    value     = join(",", var.ec2_subnets)
  }

  # EC2 instance settings
  setting {
    namespace = "aws:ec2:instances"
    name      = "InstanceTypes"
    value     = join(",", var.ec2_instance_types)
  }

  # ELB settings
  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "EnvironmentType"
    value     = "SingleInstance"
  }

  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "ServiceRole"
    value     = var.service_role_arn
  }

  # Auto Scaling settings
  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = var.instance_profile_arn
  }

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "SecurityGroups"
    value     = aws_security_group.asg.id
  }

  # PHP ini settings
  setting {
    namespace = "aws:elasticbeanstalk:container:php:phpini"
    name      = "document_root"
    value     = "/public"
  }

  setting {
    namespace = "aws:elasticbeanstalk:container:php:phpini"
    name      = "memory_limit"
    value     = "128M"
  }

  # Proxy settings
  setting {
    namespace = "aws:elasticbeanstalk:environment:proxy"
    name      = "ProxyServer"
    value     = "nginx"
  }

  # Environment variables
  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "APP_ENV"
    value     = var.environment
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "APP_KEY"
    value     = "base64:${random_string.app_key.result}"
  }

  dynamic "setting" {
    for_each = var.environment_variables
    content {
      namespace = "aws:elasticbeanstalk:application:environment"
      name      = setting.key
      value     = setting.value
    }
  }
}
