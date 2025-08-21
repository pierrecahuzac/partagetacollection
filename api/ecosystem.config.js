module.exports = {
    apps: [{
      name: 'api',
      script: 'server.js',
      watch: true,
      ignore_watch: ['node_modules', 'uploads', '.git', '*.log'],
      env: {
        NODE_ENV: 'production'
      }
    }]
  }