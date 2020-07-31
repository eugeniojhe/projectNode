const nodemailer = require('nodemailer'); 


var transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  },
  {
    from:`${process.env.SMTP_NAME} <${process.env.SMTP_EMAIL}>`  
  });

  transport.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  exports.send = async (options) =>{
     await transport.sendMail(options);
     /* await transport.sendMail({options}).then(info =>{
      console.log('Preview URL: ' + nodemailer.getTestMessageUrl(info));
     });  */
  }