import { z } from "zod";

export const profileSchema = z.object({
  name: z.string(),
  lastname: z.string(),
  email: z.string().email(),
  gender: z.string(),
  birthdate: z.string(),
  phone: z
    .string()
    .min(1, "O campo telefone é obrigatório")
    .refine(
      (value) => {
        const cleaned = value.replace(/\D/g, "");
        return /^\d{11,12}$/.test(cleaned);
      },
      {
        message: "Número de telefone inválido.",
      }
    ),
  cep: z.string(),
  street: z.string(),
  number: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  complement: z.string().optional(),
  reference: z.string().optional(),
});

export type UserProfileFormData = z.infer<typeof profileSchema>;
