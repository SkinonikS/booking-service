output "client_id" {
  value       = aws_cognito_user_pool_client.this.id
  description = "The client ID for the OAuth2 client"
}

output "client_secret" {
  value       = aws_cognito_user_pool_client.this.client_secret
  description = "The client secret for the OAuth2 client"
  sensitive   = true
}
