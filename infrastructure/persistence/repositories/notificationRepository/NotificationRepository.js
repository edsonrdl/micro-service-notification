const INotificationRepository = require('../../../../domain/useCases/INotificationRepository');

class NotificationRepository extends INotificationRepository {
    constructor(db) {
        super();
        if (!db) {
            throw new Error('A instância do banco de dados é obrigatória.');
        }
        this.collection = db.collection('notificationsCollection');
    }

    async save(notification) {
        try {
            const result = await this.collection.insertOne(notification);
            console.log(`Pedido salvo no Banco de notificação com ID: ${result.insertedId}`);
        } catch (err) {
            console.error('Erro ao salvar notificação no Banco:', err);
            throw err;
        }
    }
}

module.exports = NotificationRepository;
