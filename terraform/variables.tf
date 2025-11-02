
variable "project_name" {
  type        = string
  description = "Project name"
}

variable "domain_root" {
  type        = string
  description = "Domain root"
}

variable "repo_url" {
  type        = string
  description = "Repository url"
}

variable "vercel_api_token" {
  type        = string
  description = "Vercel API token obtained from https://vercel.com/account/settings/tokens"
  sensitive   = true
  default     = null
}
