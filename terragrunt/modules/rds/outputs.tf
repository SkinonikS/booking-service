output "db_host" {
  value = aws_db_instance.this.address
}

output "db_port" {
  value = aws_db_instance.this.port
}

output "db_name" {
  value = aws_db_instance.this.db_name
}

output "password" {
  value     = aws_db_instance.this.password
  sensitive = true
}

output "username" {
  value = aws_db_instance.this.username
}