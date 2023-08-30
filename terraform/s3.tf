resource "aws_s3_bucket" "ttsbucket" {
  bucket = var.s3_bucket_name
}

resource "aws_s3_bucket_ownership_controls" "ttsbucket" {
  bucket = aws_s3_bucket.ttsbucket.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "ttsbucket" {
  bucket = aws_s3_bucket.ttsbucket.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "ttsbucket" {
  depends_on = [
    aws_s3_bucket_ownership_controls.ttsbucket,
    aws_s3_bucket_public_access_block.ttsbucket,
  ]

  bucket = aws_s3_bucket.ttsbucket.id
  acl    = "public-read"
}

resource "aws_s3_bucket_policy" "allow_put_get_access" {
  bucket = aws_s3_bucket.ttsbucket.id
  policy = data.aws_iam_policy_document.allow_put_get_access.json
}

data "aws_iam_policy_document" "allow_put_get_access" {
  statement {
    principals {
      type        = "AWS"
      identifiers = ["*"]
    }
    actions = [
      "s3:GetObject"
    ]

    resources = [
      aws_s3_bucket.ttsbucket.arn,
      "${aws_s3_bucket.ttsbucket.arn}/*",
    ]
  }

  statement {
    principals {
      type        = "AWS"
      identifiers = [var.s3_put_allowed_iam_user_arn]
    }
    actions = [
      "s3:PutObject"
    ]
    resources = [
      aws_s3_bucket.ttsbucket.arn,
      "${aws_s3_bucket.ttsbucket.arn}/*",
    ]
  }
}

