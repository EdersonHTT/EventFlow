import nodemailer from "nodemailer";
import { Event } from "../models/Event";
import { Ticket } from "../models/Ticket";

function createTransporter() {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD) {
        return null;
    }

    return nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASSWORD
        }
    });
}

export async function sendTicketEmail(ticket: Ticket, event: Event) {
    const transporter = createTransporter();
    const from = process.env.SMTP_FROM || process.env.SMTP_USER;

    if (!transporter || !from) {
        console.warn("E-mail do ingresso não enviado: SMTP não configurado.");
        return;
    }

    await transporter.sendMail({
        from,
        to: ticket.buyerEmail,
        subject: `Seu ingresso para ${event.name}`,
        text: [
            `Olá, ${ticket.buyerName}!`,
            "",
            `Sua compra para o evento ${event.name} foi confirmada.`,
            `Código do ingresso: ${ticket.qrCode}`,
            `Data: ${new Date(event.date).toLocaleDateString("pt-BR")} às ${event.time}`,
            "",
            "Apresente este código na entrada do evento."
        ].join("\n")
    });
}
