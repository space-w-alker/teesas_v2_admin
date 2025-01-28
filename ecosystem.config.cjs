module.exports = {
  apps: [
    {
      name: 'teesas_admin',
      script: 'serve',
      args: '-s dist -l 3020', // Serve the `dist` directory on port 3020
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};

