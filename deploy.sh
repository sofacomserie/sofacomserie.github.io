#!/bin/bash

hexo clean
hexo generate

cp -R ./resources/_public/** public

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

PKG_VERSION=$PACKAGE_VERSION ./node_modules/.bin/babel resources/archives/sw.js --out-file public/sw.js --presets=@babel/preset-env,minify --plugins=babel-plugin-transform-inline-environment-variables

echo 'sw gerado'

hexo deploy

echo 'Done'
