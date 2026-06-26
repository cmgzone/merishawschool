#!/bin/sh
set -eu

mkdir -p /data
npx prisma db push

exec node dist/server.js
