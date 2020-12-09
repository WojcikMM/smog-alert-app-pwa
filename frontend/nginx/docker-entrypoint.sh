#!/bin/bash
[[ -z $APP__ROOT_PATH ]] || APP__ROOT_PATH=/
sed --in-place 's~<base href="/">~<base href="'"$APP__ROOT_PATH"'">~' /usr/share/nginx/html/index.html
echo "starting docker-entrypoint.sh"
nginx -g "daemon off;"
