# temporary setup before setting up docker for all everything
yarn concurrently --kill-others \
    "cd client/ && yarn dev" \
    "cd server/ && yarn dev"