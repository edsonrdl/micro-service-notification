const { MongoClient } = require('mongodb');

class MongoDbRepository {
    constructor(config) {
        this.mongoUrl = config.url;
        this.dbName = config.dbName;
        this.client = null;
    }

    async connect() {
        try {
            console.log('Conectando ao Banco de Notificação...');
            console.log(this.mongoUrl);
            this.client = await MongoClient.connect(this.mongoUrl);
            console.log('Conexão com Banco de Notificação bem-sucedida.');
            console.log(this.dbName);
            console.log(this.client);
            return this.client.db(this.dbName);
        } catch (err) {
            console.error('Erro ao conectar ao Banco de Notificação:', err.message);
            throw err;
        }
    }

    async closeConnection() {
        if (this.client) {
            await this.client.close();
            console.log('Conexão com Banco de Notificação fechada.');
        }
    }
}

module.exports = MongoDbRepository;
