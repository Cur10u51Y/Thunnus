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
        const transporter = nodemailer.createTransport(options.smtp);

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
