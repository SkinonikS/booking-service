output "default_doamin" {
  value = aws_amplify_app.this.default_domain
}

output "deployment_url" {
  value = "${aws_amplify_branch.this.branch_name}.${aws_amplify_app.this.default_domain}"
}