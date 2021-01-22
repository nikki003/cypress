const sgMail = require('@sendgrid/mail');
const fs = require('fs');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// send mail through sendgrid
const pathToAttachment = `${__dirname}/mochawesome-report/mochawesome.html`;
const attachment = fs.readFileSync(pathToAttachment).toString('base64');

const message = {
    to: "nikkibhalodiya03@gmail.com",
    from: "nikkibhalodiya03@gmail.com",
    subject: "Generated Test Report",
    template_id: "d-8f7f36aac0ea492cae1b4ae26a6c15df",
    attachments: [
        {
            content: attachment,
            type: "text/html",
            filename: "test-report",
            dispostition: "inline",
            content_id: "uid1" 
        }
    ]
};

sgMail.send(message).catch(error => {
    console.log(error);
})

console.log("Mail sent: ", message);