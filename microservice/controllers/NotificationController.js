const Joi = require('joi');

class NotificationController {
    constructor(processNotificationService) {
        this.processNotificationService = processNotificationService;
    }

    async createNotification(req, res) {
        const notificationSchema = Joi.object({
            notificationId: Joi.string().required(),
            orderId: Joi.string().required(),
            message: Joi.string().required(),
            sentAt: Joi.date().required(),
            status: Joi.number().positive().required(),
        });

        const { error } = notificationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        try {
            const notificationData = req.body;
            await this.processNotificationService.execute(notificationData);
            res.status(201).json({ message: 'Notificação processada com sucesso.' });
        } catch (err) {
            res.status(500).json({ error: `Erro ao processar Notificação: ${err.message}` });
        }
    }
}

module.exports = NotificationController;
