# temporary setup before setting up docker for all everything
yarn concurrently --kill-others \
    "cd services/db/ && nodemon ./server.ts" \
    "cd services/infer/ && nodemon ./server.ts"