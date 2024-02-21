module.exports = {
  apps: [
    {
      name: 'techno-shop',
      script: 'index.js',
      watch: 'index.js',
      env: {
        HTTPS: true,
      },
    },
  ],
};
