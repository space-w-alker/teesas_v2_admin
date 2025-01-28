module.exports = {
  apps: [
    {
      name: 'teesas_admin',
      script: 'dist/index.html',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      args: '--host=0.0.0.0',
      env: {
        NODE_ENV: 'production',
        PORT: 3020,
      },
    },
  ],
};
