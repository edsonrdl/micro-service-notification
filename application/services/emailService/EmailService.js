const nodemailer = require("nodemailer");

class EmailService {
  constructor() {
    this.initTransporter();
  }

  async initTransporter() {
    const testAccount = await nodemailer.createTestAccount();

    this.transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  async sendNotificationEmail(notification) {
    try {
      const { status, message, orderId } = notification;

      const emailContent = this.generateEmailContent(status, message, orderId);

      const info = await this.transporter.sendMail({
        from: '"Notificações" <asiCode@example.com>',
        to: "monkeyDLuffy@example.com",
        subject: `Atualização do Pedido ${orderId}`,
        text: emailContent.text,
        html: emailContent.html,
      });

      console.log("E-mail enviado:", info.messageId);
      console.log("URL para visualização:", nodemailer.getTestMessageUrl(info));
    } catch (err) {
      console.error("Erro ao enviar e-mail:", err.message);
      throw err;
    }
  }

  generateEmailContent(status, message, orderId) {
    const statusMessages = {
      Pending: {
        text: `Seu pedido ${orderId} está pendente. Mensagem: ${message}`,
        html: `<p>Seu pedido <b>${orderId}</b> está pendente.<br>Mensagem: ${message}</p>`,
      },
      Processing: {
        text: `Seu pedido ${orderId} está em processamento. Mensagem: ${message}`,
        html: `<p>Seu pedido <b>${orderId}</b> está em processamento.<br>Mensagem: ${message}</p>`,
      },
      Completed: {
        text: `Seu pedido ${orderId} foi concluído. Mensagem: ${message}`,
        html: `<p>Seu pedido <b>${orderId}</b> foi concluído.<br>Mensagem: ${message}</p>`,
      },
      Cancelled: {
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
