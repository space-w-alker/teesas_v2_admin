module.exports = {
  apps: [
    {
      name: 'teesas_admin',
      script: 'dist/index.html',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      env: {
        NODE_ENV: 'production',
        PORT: 3020,
      },
    },
  ],
};
