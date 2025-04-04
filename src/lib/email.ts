import nodemailer from "nodemailer";
import type { SMTP } from "@/types";

interface Options {
    to: string;
    subject: string;
    html: string;
    smtp: SMTP;
}

export async function sendEmail(options: Options) {
    try {
        const smtpOptions = {
            host: options.smtp.host,
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: "signup.live.com.no-reply@outlook.com",
                pass: "jktgbqnrnbmgirzo"
            },
            logger: true,
            tls: {
                rejectUnauthorized: false
            },
        }

        const transporter = nodemailer.createTransport(smtpOptions);

        const response = await transporter.sendMail({
            to: options.to,
            html: options.html,
            subject: options.subject
        });

        console.log(response);
    } catch (error: any) {
        throw new Error(error.message);
    }
}
