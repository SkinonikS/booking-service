output "client_id" {
  value       = aws_cognito_user_pool_client.this.id
  description = "The client ID for the OAuth2 client"
}

output "client_secret" {
  value       = aws_cognito_user_pool_client.this.client_secret
  description = "The client secret for the OAuth2 client"
  sensitive   = true
}

output "user_pool_endpoint" {
  value       = "https://${aws_cognito_user_pool.this.endpoint}"
  description = "The endpoint for the user pool"
}

output "user_pool_domain" {
  value       = "https://${aws_cognito_user_pool_domain.this.domain}.auth.${data.aws_region.current.name}.amazoncognito.com"
  description = "The domain for the user pool"
}
