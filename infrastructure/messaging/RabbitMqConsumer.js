require('dotenv').config();
const RabbitMqService = require('../services/rabbitmqservice/RabbitMqService');
const ProcessNotificationService = require('../../application/services/processenotification/ProcessNotificationService');
const ReconnectScheduler = require('../scheduler/ReconnectScheduler');

class RabbitMqConsumer {
    constructor(config, notificationRepository) {
        this.rabbitMqService = new RabbitMqService(config);
        this.notificationRepository = notificationRepository; 
        this.scheduler = new ReconnectScheduler(10, 5000);
        this.isConsuming = false; 
    }
   
    async start() {
        try {
            console.log('Conectando ao RabbitMQ e iniciando consumo da fila de notificação...');
            await this.rabbitMqService.connect(); 

        
            this.rabbitMqService.setOnReconnectCallback(() => this.restartConsuming());

         
            await this.startConsuming();
            console.log('Consumidor de notificação iniciado com sucesso.');
        } catch (err) {
            console.error('Erro ao iniciar o consumidor de notificação :', err.message);

            await this.scheduler.schedule(() => this.start());
        }
    }


    async startConsuming() {
        if (this.isConsuming) return; 

        this.isConsuming = true; 
        try {
            await this.rabbitMqService.consume(async (message) => {
                console.log('Mensagem  recebida notification_queue:', message);

                const processnotificationeService = new ProcessNotificationService(this.notificationRepository);
                try {
            
                    await processnotificationeService.execute(JSON.parse(message));
                    console.log('Mensagem  notification_queue processada com sucesso.');
                } catch (err) {
                    console.error('Erro ao processar mensagem notification_queue:', err.message);
                }
            });
        } catch (err) {
            console.error('Erro ao iniciar o consumo de mensagens de notificação:', err.message);
        }
    }

    async restartConsuming() {
        console.log('Reiniciando consumo de processamento de notificação...');
        this.isConsuming = false;
        await this.startConsuming(); 
    }


    async stop() {
        console.log('Encerrando consumidor RabbitMQ...');
        await this.rabbitMqService.close();
        this.isConsuming = false; 
    }
}

module.exports = RabbitMqConsumer;