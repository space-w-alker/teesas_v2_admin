module.exports = {
  apps: [
    {
      name: 'teesas_admin',
      script: 'serve',
      args: ['-s', 'dist', '-l', '3020'], // Correctly pass arguments as an array
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
