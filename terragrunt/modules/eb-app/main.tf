

resource "aws_elastic_beanstalk_application" "this" {
  name        = var.name
  description = var.description

  appversion_lifecycle {
    max_count             = 2
    delete_source_from_s3 = true
    service_role          = var.appversion_lifecycle_service_role_arn
  }
}