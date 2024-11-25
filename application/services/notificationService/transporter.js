const nodemailer = require('nodemailer');

(async () => {

  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: testAccount.user, 
      pass: testAccount.pass  
    }
  });


  const info = await transporter.sendMail({
    from: '"Teste" <asiCode@exemplo.com>',
    to: 'monkeyDLuffyo@exemplo.com',
    subject: 'Teste Ethereal',
    text: 'Olá, este é um e-mail fictício para testes!',
    html: '<b>Olá, este é um e-mail fictício para testes!</b>'
  });

  console.log('E-mail enviado:', info.messageId);
  console.log('URL para visualização:', nodemailer.getTestMessageUrl(info));
})();
