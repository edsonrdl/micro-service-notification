class Notification {
    constructor({ notificationId,orderId, message , sentAt,status }) {
        if (!notificationId ||!orderId || !message || !sentAt||!status) {
            throw new Error('Todos os campos da notificação são obrigatórios.');
        }

        this.notificationId = notificationId;
        this.orderId = orderId;
        this.message = message;
        this.sentAt = sentAt;
        this.status = status;
    }
}

module.exports = Notification;
