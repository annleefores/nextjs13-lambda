#! /usr/bin/bash

set -e # stop execution if anything fails

# change this for different cdn domain address
CDN_NAME="cdn2.annleefores.cloud"

echo "Installing node modules"
npm i

echo "Building nextjs application"
npm run build

# Package files for deployment

echo "packaging files"

cp -r public/. .next/standalone/public
cp run.sh .next/standalone/


echo "provisioning infrastructure"

cd terraform/

if [ ! -d ".terraform" ]
then
    echo "Terraform has not been initialized. Initializing now..."
    terraform init
else
    echo "Terraform is already initialized"
fi

terraform validate
terraform apply -auto-approve


# move to application folder and sync static files to CDN
echo "syncing static files to S3"
cd ..
# sync static files to S3 + Cloudfront
aws s3 cp .next/static/ s3://$CDN_NAME/_next/static/ --recursive