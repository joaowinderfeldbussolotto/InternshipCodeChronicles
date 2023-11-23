variable "region" {
  description = "AWS region"
  default     = "us-east-1"
}

variable "s3_bucket_name" {
  description = "Name of the S3 bucket"
}

variable "dynamodb_table_name" {
  description = "Name of the DynamoDB table"
}

variable "s3_put_allowed_iam_user_arn" {
  description = "Allowed PUT IAM user"
}
