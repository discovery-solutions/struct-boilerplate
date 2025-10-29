import { z } from "zod";

export interface FileInterface {
  _id?: string;
  name: string;
  openai: string;
  text?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export const fileFormSchema = z.object({
  name: z.string().min(2, { message: "O nome deve ter pelo menos 2 caracteres." }),
  openai: z.string().min(1, { message: "OpenAI FileID is required" }),
  text: z.string().min(1, { message: "Text is required" }),
});
