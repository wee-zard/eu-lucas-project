#!/bin/bash
chmod -R 755 /usr/share/nginx/html/
exec nginx -g "daemon off;"
