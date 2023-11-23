provider "aws" {
  region = var.region

  default_tags {
    tags = {
      owner      = "equipe5"
      managed_by = "terraform"
    }
  }
}
