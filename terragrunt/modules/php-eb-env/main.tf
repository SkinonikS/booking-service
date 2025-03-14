locals {
  eb_application_name = lower(var.eb_application_name)
  environment         = lower(var.environment)

  environment_variables = merge(
    {
      # App
      APP_TIMEZONE        = "UTC"
      APP_LOCALE          = "en"
      APP_FALLBACK_LOCALE = "en"
      APP_FAKER_LOCALE    = "en_US"
      APP_URL             = "http://localhost"
      # Log
      LOG_CHANNEL              = "stack"
      LOG_STACK                = "single"
      LOG_DEPRECATIONS_CHANNEL = "null"
      LOG_LEVEL                = "debug"
      # Session
      SESSION_DRIVER   = "database"
      SESSION_LIFETIME = "120"
      SESSION_ENCRYPT  = "false"
      SESSION_PATH     = "/"
      SESSION_DOMAIN   = "null"
      # Cache
      CACHE_STORE  = "file"
      CACHE_PREFIX = ""
      # Redis
      REDIS_CLIENT   = "phpredis"
      REDIS_HOST     = "127.0.0.1"
      REDIS_PASSWORD = "null"
      REDIS_PORT     = "6379"
      # Other
      APP_MAINTENANCE_DRIVER = "file"
      BCRYPT_ROUNDS          = "12"
      PHP_CLI_SERVER_WORKERS = "4"
    },
    var.environment_variables
  )
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

resource "time_static" "curren_time" {}

resource "aws_s3_object" "init_version" {
  bucket = var.eb_bucket_name
  key    = "laravel-app-${time_static.curren_time.unix}.zip"
  source = "sample.zip"
}

resource "aws_elastic_beanstalk_application_version" "this" {
  name        = "v-${substr(md5(time_static.curren_time.unix), 0, 8)}-${time_static.curren_time.unix}"
  description = "Deployed from Terraform"
  application = var.eb_application_name

  bucket = var.eb_bucket_name
  key    = aws_s3_object.init_version.key
}

# Elastic Beanstalk environment
resource "aws_elastic_beanstalk_environment" "this" {
  name = local.environment

  application         = var.eb_application_name
  solution_stack_name = var.solution_stack_name
  tier                = "WebServer"
  version_label       = aws_elastic_beanstalk_application_version.this.name
  cname_prefix        = "${local.environment}-"

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
    value     = random_string.app_key.result
  }

  dynamic "setting" {
    for_each = local.environment_variables
    content {
      namespace = "aws:elasticbeanstalk:application:environment"
      name      = setting.key
      value     = setting.value
    }
  }
}

resource "terraform_data" "update_app_url_env" {
  depends_on = [aws_elastic_beanstalk_environment.this]

  provisioner "local-exec" {
    command = <<EOT
      aws elasticbeanstalk update-environment \
        --application-name ${var.eb_application_name} \
        --environment-name ${aws_elastic_beanstalk_environment.this.name} \
        --option-settings Namespace=aws:elasticbeanstalk:application:environment,OptionName=APP_URL,Value=http://${aws_elastic_beanstalk_environment.this.cname}
    EOT
  }

  triggers_replace = [
    aws_elastic_beanstalk_environment.this.cname
  ]
}
