/* eslint-disable no-console */
import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from './HandleBarsMailTemplate';

interface ITemplateVariable {
    [key: string]: string | number;
}

interface IParseMailTemplate {
    file: string;
    variables: ITemplateVariable;
}

interface IMailContact {
    name: string;
    adress: string;
}

interface ISendMail {
    to: IMailContact;
    from?: IMailContact;
    subject: string;
    templateData: IParseMailTemplate;
}

export default class EtherealMail {
    static async sendMail({
        to,
        from,
        subject,
        templateData,
    }: ISendMail): Promise<void> {
        const account = await nodemailer.createTestAccount();
        const mailTemplate = new HandlebarsMailTemplate();

        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass,
            },
        });

        const message = await transporter.sendMail({
            from: {
                name: from?.name || 'Equipe Pedro Serôdio',
                address: from?.adress || 'equipe@pedroserodio.com.br',
            },
            to: {
                name: to.name,
                address: to.adress,
            },
            subject,
            html: await mailTemplate.parser(templateData),
        });

        console.log(`Message sent: ${message.messageId}`);

        console.log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`);
    }
}
