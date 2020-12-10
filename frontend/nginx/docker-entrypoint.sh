#!/bin/bash
echo "starting docker-entrypoint.sh"
#[[ -z $APP__ROOT_PATH ]] && APP__ROOT_PATH=/
sed --in-place 's~<base href="/">~<base href="'"$APP__ROOT_PATH"'/">~' /usr/share/nginx/html/index.html
echo "starting nginx"
nginx -g "daemon off;"
