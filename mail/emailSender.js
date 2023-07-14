const { config } = require("../config/index");
const generateActivateAccountEmailTemplate = require('./emailTemplates/activateAccountTemplate')
require("dotenv").config();
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport(
     {
    //    service: config.serviceEmailSender,
    //    auth: {
    //         user: config.emailSender,
    //         pass: config.passEmailSender,
    //     }
        service: 'gmail',
        auth: {
             user: 'parkingspot264@gmail.com',
             pass: 'stccgnykcaziuwth',
         }
    });


function sendEmail(to, subject, template){
 transporter.verify((err, success) => {
    if (err) console.error(err);
    console.log('Your config is correct');
    });   

const options = {

    from: config.emailSender,
    to:to,
    subject: subject,
    html:template
}

    transporter.sendMail(options, function (err, info){
    if(err){
        console.log("Se cago: " + err.message);
        return;
    }
    console.log("Sent: " + info.response);
})

}
module.exports = {
sendEmail,
}