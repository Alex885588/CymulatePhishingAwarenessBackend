import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_SENDER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    async sendEmail(sender: string, to: string, subject: string, body: string, id: string): Promise<void> {
        const mailOptions: nodemailer.SendMailOptions = {
            from: sender || process.env.EMAIL_SENDER,
            to,
            subject,
            html: body.replace('$$$itemID', id),
        };
        await this.transporter.sendMail(mailOptions);
    }
}
