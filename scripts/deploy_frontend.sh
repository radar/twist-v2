#!/bin/bash
cd ~/code/twist-v2/frontend
yarn build
aws s3 sync build s3://twistbooks.com --acl public-read --delete
aws cloudfront create-invalidation --distribution-id E16VNKOCFPXCL3 --paths '/*'
