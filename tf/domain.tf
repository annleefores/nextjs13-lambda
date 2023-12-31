
resource "aws_apigatewayv2_domain_name" "api_gw_domain" {
  domain_name = var.DOMAIN_NAME

  domain_name_configuration {
    certificate_arn = var.API_GW_CERTIFICATE_ARN
    endpoint_type   = "REGIONAL"
    security_policy = "TLS_1_2"
  }
}

data "aws_route53_zone" "HostedZoneID" {
  name         = var.HOSTED_ZONE_DOMAIN
  private_zone = false
}

resource "aws_route53_record" "application_domain" {
  name    = aws_apigatewayv2_domain_name.api_gw_domain.domain_name
  type    = "A"
  zone_id = data.aws_route53_zone.HostedZoneID.zone_id

  alias {
    name                   = aws_apigatewayv2_domain_name.api_gw_domain.domain_name_configuration[0].target_domain_name
    zone_id                = aws_apigatewayv2_domain_name.api_gw_domain.domain_name_configuration[0].hosted_zone_id
    evaluate_target_health = false
  }
}
resource "aws_route53_record" "cloudfront_domain" {
  name    = var.CDN_DOMAIN
  type    = "A"
  zone_id = data.aws_route53_zone.HostedZoneID.zone_id

  alias {
    name                   = aws_cloudfront_distribution.s3_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.s3_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_apigatewayv2_api_mapping" "api_gw_domain_mapping" {
  api_id      = aws_apigatewayv2_api.httpAPI.id
  domain_name = aws_apigatewayv2_domain_name.api_gw_domain.id
  stage       = "$default"
}

