terraform {
  required_version = "~> 1.13.4"

  backend "local" {}

  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "~> 2.0"
    }
  }
}
