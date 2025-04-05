output "user_pool_url" {
  value = "https://${aws_cognito_user_pool.this.endpoint}"
}

output "user_pool_domain_url" {
  value = "https://${aws_cognito_user_pool_domain.this.domain}.auth.${data.aws_region.current.name}.amazoncognito.com"
}

output "user_pool_domain" {
  value = aws_cognito_user_pool_domain.this.domain
}

output "user_pool_id" {
  value = aws_cognito_user_pool.this.id
}