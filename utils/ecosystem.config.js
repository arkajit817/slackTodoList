module.exports = {
    apps: [
        {
            name: 'todo',
            script: './app.js',
            env: {
                'PORT': 8000,
                'NODE_ENV': 'development',
                'database': 'mongodb://localhost:27017/todoapp'
            },
            env_testing: {
                'PORT': 8081,
                'NODE_ENV': 'testing',
                'database': 'mongodb://localhost:27017/todoappTesting',
                'IP': 'http://13.232.24.203'

            },
            env_production: {
                'PORT': 8080,
                'NODE_ENV': 'production',
                'database': 'mongodb://localhost:27017/todoappProduction',
                'IP': 'http://13.232.24.203'

            }
        }
    ],
    deploy: {
        production: {
            user: 'node',
            host: '13.232.24.203',
            ref: 'origin/master',
            repo: 'git@github.com:repo.git',
            path: '/var/www/production',
            'post-deploy': 'npm i && pm2 start ./utils/ecosystem.config.js --env production --update-env'
        }
    }
}
