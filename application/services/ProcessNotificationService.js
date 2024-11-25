const Notification = require("../../domain/entities/Notification");
const NotificationEvent = require("./NotificationEvent");
const EmailService = require("./EmailService");

class ProcessNotificationService {
  constructor(notificationRepository) {
    this.notificationRepository = notificationRepository;
    this.notificationEvent = new NotificationEvent();
    this.initListeners(); 
  }

  initListeners() {
    const emailService = new EmailService();
    this.notificationEvent.subscribe(async (notification) => {
      try {
        await emailService.sendNotificationEmail(notification); 
        console.log(`E-mail enviado com sucesso para notificação ${notification.notificationId}.`);
      } catch (err) {
        console.error(`Erro ao enviar e-mail para notificação ${notification.notificationId}: ${err.message}`);
      }
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
      console.log(`Notificação ${notification.notificationId} salva com sucesso no banco.`);


      await this.notificationEvent.notify(notification);
    } catch (err) {
      console.error(`Erro ao processar notificação: ${err.message}`);
      throw err; 
    }
  }
}

module.exports = ProcessNotificationService;
