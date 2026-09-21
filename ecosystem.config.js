module.exports = {
  apps: [
    {
      name: 'betkit-web',
      script: './server/index.mjs',
      cwd: './.output',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 80,
      },
      max_memory_restart: '1G',
      error_log: './logs/err.log',
      out_log: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      combine_logs: true,
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000,
    }
  ]
}