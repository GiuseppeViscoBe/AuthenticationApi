import nodemailer, {SendMailOptions} from "nodemailer"
import logger from "./logger"
import log from "./logger";

// async function createTestCreds(){
//     const creds = await nodemailer.createTestAccount()

//     logger.info({creds})

// }

// createTestCreds()

interface SmtpConfig {
    user: string;
    pass: string;
    host: string;
    port: number;
    secure: boolean;
  }

  
const smtpConfig = JSON.parse(process.env.SMTP_CONFIG || '{}') as SmtpConfig;

log.info(`SMTP CONF: ${smtpConfig}`)

const transporter = nodemailer.createTransport({
    ...smtpConfig,
    auth: {user: smtpConfig.user, pass: smtpConfig.pass}

}) 

async function sendEmail(payload : SendMailOptions){
    transporter.sendMail(payload, (err,info) =>{
        if(err){
            log.error(err,'Error sending email')
            return
        }

        log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`)
    })
}

export default sendEmail;