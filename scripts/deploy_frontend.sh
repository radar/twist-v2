#!/bin/bash
cd ~/code/hanami/twist/frontend
yarn build
aws s3 sync build s3://twistbooks.com --acl public-read --delete
aws cloudfront create-invalidation --distribution-id E16VNKOCFPXCL3 --paths '/*'
