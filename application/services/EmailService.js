const nodemailer = require("nodemailer");

class EmailService {
  constructor() {
    this.transporter = null;
    this.initTransporter();
  }

  async initTransporter() {
    try {
      const testAccount = await nodemailer.createTestAccount();

      this.transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // False para TLS
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

      console.log("Transporte de e-mail inicializado com sucesso.");
    } catch (err) {
      console.error("Erro ao inicializar o transporte de e-mail:", err.message);
      throw err;
    }
  }

  async sendNotificationEmail(notification) {
    if (!this.transporter) {
      throw new Error("O transporter de e-mail não foi inicializado.");
    }

    try {
      const { status, message, orderId } = notification;

      const emailContent = this.generateEmailContent(status, message, orderId);

      const info = await this.transporter.sendMail({
        from: '"Sistema de Notificação" <asicode@asi.com>', 
        to: "monkeyDLuffy@example.com", 
        subject: `Atualização do Pedido ${orderId}`,
        text: emailContent.text,
        html: emailContent.html,
      });

      console.log("E-mail enviado com sucesso:", info.messageId);
      console.log("URL para visualização no Ethereal:", nodemailer.getTestMessageUrl(info));
    } catch (err) {
      console.error("Erro ao enviar e-mail:", err.message);
      throw err;
    }
  }

  generateEmailContent(status, message, orderId) {
    const statusMessages = {
      1: {
        text: `Seu pedido ${orderId} está pendente. Mensagem: ${message}`,
        html: `<p>Seu pedido <b>${orderId}</b> está pendente.<br>Mensagem: ${message}</p>`,
      },
      2: {
        text: `Seu pedido ${orderId} está em processamento. Mensagem: ${message}`,
        html: `<p>Seu pedido <b>${orderId}</b> está em processamento.<br>Mensagem: ${message}</p>`,
      },
      3: {
        text: `Seu pedido ${orderId} foi concluído. Mensagem: ${message}`,
        html: `<p>Seu pedido <b>${orderId}</b> foi concluído.<br>Mensagem: ${message}</p>`,
      },
      4: {
        text: `Seu pedido ${orderId} foi cancelado. Mensagem: ${message}`,
        html: `<p>Seu pedido <b>${orderId}</b> foi cancelado.<br>Mensagem: ${message}</p>`,
      },
    };

    return statusMessages[status] || {
      text: `Status desconhecido para o pedido ${orderId}. Mensagem: ${message}`,
      html: `<p>Status desconhecido para o pedido <b>${orderId}</b>.<br>Mensagem: ${message}</p>`,
    };
  }
}

module.exports = EmailService;
