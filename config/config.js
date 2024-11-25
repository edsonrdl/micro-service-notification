module.exports = {
    rabbitMq: {
        url: process.env.RABBITMQ_URL,
        exchange: process.env.RABBITMQ_EXCHANGE,
        queue: process.env.RABBITMQ_QUEUE,
        routingKey: process.env.RABBITMQ_ROUTING_KEY,
    },
    mongoDb: {
        url: process.env.MONGODB_URL,
        dbName: process.env.MONGODB_DATABASE,
    },
    server: {
        port: process.env.PORT || 5000,
        allowedOrigin: process.env.ALLOWED_ORIGIN || '*',
    },
    retryInterval: process.env.RETRY_INTERVAL_MS || 5000,
    mailtrap: {
        user: process.env.MAILTRAP_USER || 'seu_usuario_mailtrap',
        pass: process.env.MAILTRAP_PASS || 'sua_senha_mailtrap',
    },
};
