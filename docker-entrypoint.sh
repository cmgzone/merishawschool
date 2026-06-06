#!/bin/sh
set -eu

mkdir -p /app/data /app/public/uploads

if [ ! -f /app/data/admin-content.json ] && [ -f /app/.docker-seed/admin-content.json ]; then
  cp /app/.docker-seed/admin-content.json /app/data/admin-content.json
fi

chown -R nextjs:nodejs /app/data /app/public/uploads

exec su-exec nextjs:nodejs "$@"
