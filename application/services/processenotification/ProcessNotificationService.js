const Notification = require("../../../domain/entities/Notification");

class ProcessNotificationService {
  constructor(notificationRepository) {
    this.notificationRepository = notificationRepository;
  }
  async execute(notificationData) {
    try {
      const notification = new Notification({
        notificationId: notificationData.NotificationId,
        orderId: notificationData.OrderId,
        message: notificationData.Message,
        sentAt: notificationData.SentAt,
        status: notificationData.Status,
      });
      await this.notificationRepository.save(notification);
      console.log(`Notificação ${notification.notificationId} processado com sucesso.`);
    } catch (err) {
      console.error(`Erro ao processar notificação: ${err.message}`);
      throw err;
    }
  }
}

module.exports = ProcessNotificationService;
