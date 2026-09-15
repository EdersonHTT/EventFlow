import { z } from "zod";

export const registrationSchema = z.object({
    userId: z.coerce.number().int().positive("O usuário é obrigatório."),
    eventId: z.coerce.number().int().positive("O evento é obrigatório.")
});