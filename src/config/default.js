const config = {
    app: {
        name: process.env.APP_NAME || 'Node.js API Demo',
        env: process.env.NODE_ENV || 'development',
        port: process.env.PORT || 3000
    },
    db: {
        host: process.env.DB_HOST || 'cluster0-0qaku.mongodb.net',
        port: process.env.DB_PORT || 27017,
        username: process.env.DB_USER || 'havanthai',
        password: process.env.DB_PASS || 'havanthai',
        database: process.env.DB_NAME || 'test'
    },
    auth: {
        jwt_secret: process.env.JWT_SECRET || 'c2VjcmV0',
        jwt_expires_in: process.env.JWT_EXPIRES_IN || '1d'
    }
}

module.exports = config;
