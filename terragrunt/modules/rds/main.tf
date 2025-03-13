locals {
  environment = lower(var.environment)
  name        = lower(var.name)
}

resource "aws_security_group" "this" {
  name        = "rds-${local.environment}-${local.name}-sg"
  description = "Allow traffic to RDS from VPC"

  vpc_id = var.vpc_id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = [var.vpc_cidr_block]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_instance" "this" {
  identifier = "rds-${local.environment}-${local.name}"

  engine               = "postgres"
  engine_version       = "17.4"
  instance_class       = "db.t4g.micro"
  parameter_group_name = "default.postgres17"

  vpc_security_group_ids = [aws_security_group.this.id]

  username = var.username
  password = random_id.db_password.hex

  port                 = 5432
  db_name              = var.db_name
  db_subnet_group_name = aws_db_subnet_group.this.name

  multi_az            = false
  publicly_accessible = false
  storage_encrypted   = false

  backup_retention_period = 7
  allocated_storage       = 5
}

resource "aws_db_subnet_group" "this" {
  name        = "rds-${local.environment}-${local.name}-subnet-group"
  description = "Database subnet group for ${local.environment}-${local.name}"

  subnet_ids = var.subnet_ids

  tags = {
    Name        = local.name
    Environment = local.environment
  }
}

resource "random_id" "db_password" {
  byte_length = 32
}