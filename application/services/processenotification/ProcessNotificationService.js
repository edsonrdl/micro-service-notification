const Notification = require("../../../domain/entities/Notification");
const NotificationEvent = require("../notificationService/NotificationEvent");
const EmailService = require("../emailService/EmailService");

class ProcessNotificationService {
  constructor(notificationRepository) {
    this.notificationRepository = notificationRepository;
    this.notificationEvent = new NotificationEvent();
    this.initListeners();
  }

  initListeners() {
    const emailService = new EmailService();
    this.notificationEvent.subscribe(async (notification) => {
      await emailService.sendNotificationEmail(notification);
    });
  }

  async execute(notificationData) {
    try {
     
      const notification = new Notification({
        notificationId: notificationData.NotificationId,
        orderId: notificationData.OrderId,
        message: notificationData.Message,
        sentAt: notificationData.SentAt || new Date(),
        status: notificationData.Status,
      });


      await this.notificationRepository.save(notification);
      console.log(`Notificação ${notification.notificationId} processada com sucesso.`);


      await this.notificationEvent.notify(notification);
    } catch (err) {
      console.error(`Erro ao processar notificação: ${err.message}`);
      throw err;
    }
  }
}

module.exports = ProcessNotificationService;
