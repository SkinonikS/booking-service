locals {
  name = lower(var.name)
  env  = lower(var.env)
}

# VPC
resource "aws_vpc" "this" {
  cidr_block = var.cidr_block

  enable_dns_hostnames = var.enable_dns_hostnames
  enable_dns_support   = var.enable_dns_support

  tags = {
    Name        = local.name
    Environment = local.env
  }
}

# Internet Gateway
resource "aws_internet_gateway" "this" {
  vpc_id = aws_vpc.this.id

  tags = {
    Name        = local.name
    Environment = local.env
  }
}

# Public Subnets
resource "aws_subnet" "public" {
  count = length(var.availability_zones)

  vpc_id                  = aws_vpc.this.id
  cidr_block              = element(var.public_subnets, count.index)
  availability_zone       = element(var.availability_zones, count.index)
  map_public_ip_on_launch = var.map_public_ip_on_launch

  tags = {
    Name        = lower(format("${var.public_subnet_suffix}-${var.name}-%s", element(var.availability_zones, count.index)))
    Environment = local.env
  }
}

# Public Route Table
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.this.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.this.id
  }

  tags = {
    Name        = local.name
    Environment = local.env
  }
}

# Public Route Table Association
resource "aws_route_table_association" "public" {
  count = length(var.public_subnets)

  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}
