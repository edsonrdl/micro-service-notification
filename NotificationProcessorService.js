const RabbitMqService = require('./RabbitMqService');
const MongoDbService = require('./MongoDbService');

class NotificationProcessorService {
    constructor() {
      this.rabbitMqService = new RabbitMqService();
      this.mongoDbService = new MongoDbService();
    }
  
    async start() {
      try {
        const db = await this.mongoDbService.connect();
        const ordersCollection = db.collection('notification');
  
        this.rabbitMqService.connect((channel) => {
          console.log(`[*] Aguardando mensagens na fila "${this.rabbitMqService.queueName}".`);
  
          channel.consume(this.rabbitMqService.queueName, (msg) => {
            if (msg !== null) {
              try {
                const order = JSON.parse(msg.content.toString());
                console.log(`[x] Processando novo pedido: ${order.OrderId}`);
  
                ordersCollection.insertOne(order, (err, result) => {
                  if (err) {
                    console.error('Erro ao salvar notificação no MongoDB:', err);
                  } else {
                    console.log('Notificação salvo com sucesso no MongoDB:', result.insertedId);
                  }
                });
  
                channel.ack(msg);
              } catch (err) {
                console.error('Erro ao processar mensagem:', err);
                channel.nack(msg);
              }
            }
          }, { noAck: false });
        });
      } catch (err) {
        console.error('Erro ao iniciar o serviço:', err);
      }
    }
  }
  

  const orderProcessor = new NotificationProcessorService();
  orderProcessor.start();
  