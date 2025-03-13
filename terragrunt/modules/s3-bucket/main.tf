resource "aws_s3_bucket" "this" {
  bucket        = "${var.s3_bucket_name_suffix}-${random_id.s3_bucket_name_suffix.hex}"
  force_destroy = true

  tags = {
    Environment = var.environment
  }
}

resource "random_id" "s3_bucket_name_suffix" {
  byte_length = 8
}