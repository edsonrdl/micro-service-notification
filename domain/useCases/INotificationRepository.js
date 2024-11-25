class INotificationRepository {
    async save(notification) {
        throw new Error('Método "save" não implementado.');
    }
}

module.exports = INotificationRepository;
