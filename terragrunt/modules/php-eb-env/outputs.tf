output "eb_endpoint_url" {
  value = aws_elastic_beanstalk_environment.this.endpoint_url
}

output "eb_cname" {
  value = aws_elastic_beanstalk_environment.this.cname
}