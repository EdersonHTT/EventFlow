import { z } from "zod";

const eventFields = {
	name: z.string().trim().min(1, "O nome do evento é obrigatório."),
	description: z.string().trim().min(1, "A descrição do evento é obrigatória."),
	date: z.coerce.date({ message: "Informe uma data válida." }),
	time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/, "Informe um horário válido."),
	ticketPrice: z.coerce.number().positive("O preço do ingresso deve ser maior que zero."),
	categoryId: z.coerce.number().int().positive("A categoria é obrigatória."),
	locationId: z.coerce.number().int().positive("A localização é obrigatória.")
};

export const eventCreateSchema = z.object(eventFields);
export const eventUpdateSchema = eventCreateSchema;
