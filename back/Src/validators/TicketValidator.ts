import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const ticketSchema = z.object({
    buyerName: z.string().min(2, "Nome do comprador obrigatório").optional(),
    buyerEmail: z.string().email("Email inválido"),
    price: z.number("Preço deve ser numérico").positive("Preço deve ser maior que zero"),
    qrCode: z.string().min(1, "QRCode obrigatório"),
    status: z.enum(["pending", "checked"]).optional(),
    eventId: z.number( "ID do evento deve ser numérico" ).int().positive("ID do evento inválido")
});

const ticketUpdateSchema = ticketSchema.partial();

export function validateTicket(isUpdate = false) {
    return (req: Request, res: Response, next: NextFunction) => {
        const schema = isUpdate ? ticketUpdateSchema : ticketSchema;
        const result = schema.safeParse(req.body);
        console.log(result);

        if (!result.success) {
            return res.status(400).json({
                message: "Dados do ticket inválidos",
                errors: result.error.flatten().fieldErrors
            });
        }

        req.body = result.data;
        next();
    };
}
