#!/usr/bin/env sh

# Setup chart name
 if [ "$1" != "api" ] && [ "$1" != "app" ]; then
   echo "Unknown parameter"
   exit 1;
 else
  chartName=air-tracker-"$1";
 fi

# Setup chartVersion
 if [ -z "$2" ]; then
  chartVersion="0.1.0";
 else
  chartVersion=$2;
 fi

# Setup appVersion
 if [ -z "$3" ]; then
  appVersion="1.0";
 else
  appVersion=$3;
 fi

# Lint chart
helm lint "$chartName";

# shellcheck disable=SC2181
if [ $? != 0 ]; then
  echo "Lint throw errors"
  read without -r
  exit 1;
fi

# Package chart
helm package "$chartName" --app-version "$appVersion" --version "$chartVersion"

packageTarName="$chartName"-"$chartVersion".tgz

if [ -z "$PRIVATE_HELM_REPO_PATH" ]; then
  PRIVATE_HELM_REPO_PATH="$HOME"'/Desktop/git/helm-repo'
fi

# Copy chart to private helm repo
cp ./"$packageTarName"  "$PRIVATE_HELM_REPO_PATH/$chartName/$packageTarName"

# Publish changes to private helm repo
helm repo index "$PRIVATE_HELM_REPO_PATH"

git -C "$PRIVATE_HELM_REPO_PATH" add .
git -C "$PRIVATE_HELM_REPO_PATH" status
git -C "$PRIVATE_HELM_REPO_PATH" commit -a -m "Update helm repo with $chartName"
git -C "$PRIVATE_HELM_REPO_PATH" push

rm ./"$packageTarName"

echo "DONE. Click any key to continue ..."
read -r
