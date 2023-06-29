# nextjs-lambda

This repository provides a quick and easy way to deploy a simple NextJS application on AWS Lambda using [aws-lambda-web-adapter](https://github.com/awslabs/aws-lambda-web-adapter).

## Usage

Before you begin, make sure you have the following prerequisites installed:

- [Install Terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)
- [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html) and [add your AWS credentials](https://docs.aws.amazon.com/cli/latest/reference/configure/index.html)

### Configuring NextJS App

In your NextJS app, update the `next.config.js` file to build the application for standalone deployment by adding `output: 'standalone'`. Additionally, include the `assetPrefix` property to specify the CDN URL for serving static files:

```jsx
const nextConfig = {
    output: 'standalone',
    assetPrefix: 'https://<CDN_URL>',
    // other code
}
```

### Cloning the Repository

Clone this repository to the root of your NextJS application and remove any example files:

```bash
git clone --depth 1 https://github.com/annleefores/nextjs-lambda.git && \\
cd nextjs-lambda && \\
git rm -r --cached example && rm -rf example
```

### Configuration

Update the `main.tf` file to use your preferred method for handling Terraform state.

Create a `terraform.tfvars` file based on the provided `terraform.tfvars.example` file and add the necessary values.

In the `deploy.sh` file, add the CDN domain address to the following line:

```bash
CDN_NAME="<CDN_DOMAIN>"
```

### Deployment

To deploy your application, run the `deploy.sh` script.

### **Destroying the Deployment**

To destroy the deployment, navigate to the `nextjs-lambda/` folder and run the following command:

```bash
terraform destroy
```

For more details and a comprehensive guide, refer to the article: [article_link].