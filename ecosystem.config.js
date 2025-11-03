module.exports = {
  apps: [
    {
      name: "react-ssr-app",
      script: "./server.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        BASE_URL: "https://yourdomain.com",
        SITE_NAME: "Your Site Name",
        API_URL: "https://api.yourdomain.com",
      },
    },
  ],
};
