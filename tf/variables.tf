
variable "memory_size" {
  type    = number
  default = 512

}

variable "NodeRuntime" {
  type    = string
  default = "nodejs18.x"

}

variable "timeout" {
  type    = number
  default = 10

}

variable "LAMBDA_FUNCTION_NAME" {
  type    = string
  default = "Nextjs-app"
}

variable "AWS_LAMBDA_EXEC_WRAPPER" {
  type    = string
  default = "/opt/bootstrap"
}

variable "PORT" {
  type    = number
  default = 8000

}

variable "REGION" {
  type = string
}

variable "DOMAIN_NAME" {
  type = string
}


variable "API_GW_CERTIFICATE_ARN" {
  type = string
}

variable "CLOUDFRONT_CERTIFICATE_ARN" {
  type = string
}

variable "HOSTED_ZONE_DOMAIN" {
  type = string
}

variable "CDN_DOMAIN" {
  type = string
}

variable "SOURCE_DIR" {
  type = string

}

variable "FIRST_RUN" {
  type    = bool
  default = false
}

