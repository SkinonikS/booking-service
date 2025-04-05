output "eb_endpoint_url" {
  value = "http://${aws_elastic_beanstalk_environment.this.endpoint_url}"
}

output "eb_cname" {
  value = "http://${aws_elastic_beanstalk_environment.this.cname}"
}