import { z } from "zod";

const cpfSchema = z
	.string()
	.regex(/^\d{11}$/, "O CPF deve conter 11 números.");

export const userCreateSchema = z.object({
	name: z.string().trim().min(1, "O nome é obrigatório."),
	email: z.string().trim().email("Informe um email válido."),
	cpf: cpfSchema,
	password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres.")
});

export const userUpdateSchema = userCreateSchema.omit({ password: true });

