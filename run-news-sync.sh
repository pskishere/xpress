
#!/bin/sh
# Ensure PATH includes global npm binaries
export PATH=$PATH:/usr/local/bin

while true; do
  node /app/src/utils/syncNews.js
  sleep 43200
done
