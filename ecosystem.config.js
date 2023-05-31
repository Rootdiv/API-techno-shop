module.exports = {
  apps: [
    {
      name: 'techno-shop',
      script: 'index.js',
      watch: '.',
      env: {
        HTTP: 'https',
      },
    },
  ],
};
