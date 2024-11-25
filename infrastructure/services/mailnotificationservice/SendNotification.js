const nodemailer = require('nodemailer');
require('dotenv').config({ path: '../../../config/.env' });


// Configuração do transporte usando o Mailtrap
const SendNotification = nodemailer.createTransport({
  host: 'smtp.mailtrap.io', // SMTP da Mailtrap
  port: 2525, // Porta padrão para Mailtrap
  auth: {
    user: process.env.MAILTRAP_USER, // Usuário vindo do .env
    pass: process.env.MAILTRAP_PASS, // Senha vindo do .env
  },
});
console.log('MAILTRAP_USER:', process.env.MAILTRAP_USER ? 'Carregado' : 'Não carregado');
console.log('MAILTRAP_PASS:', process.env.MAILTRAP_PASS ? 'Carregado' : 'Não carregado');
console.log('MONGODB_URL:', process.env.MONGODB_URL ? 'Carregado' : 'Não carregado');

// Função para enviar e-mail
async function enviarEmail() {
  try {
    const info = await SendNotification.sendMail({
      from: '"Meu Sistema" <noreply@meusistema.com>', // Remetente fictício
      to: 'destinatario@teste.com', // Pode ser qualquer e-mail para teste no Mailtrap
      subject: 'Notificação do Sistema', // Assunto
      text: 'Olá, este é um teste de notificação!', // Corpo do e-mail em texto simples
      html: '<b>Olá, este é um teste de notificação!</b>', // Corpo do e-mail em HTML
    });
 
    console.log('E-mail enviado: ', info.messageId);
    console.log('E-mail enviado: ', info.messageId);
    console.log('Preview URL: ', nodemailer.getTestMessageUrl(info)); // Mostra uma URL de preview no console
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
  }
}

// Chamar a função
enviarEmail();
