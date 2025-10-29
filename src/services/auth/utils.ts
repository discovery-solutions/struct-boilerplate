import { UserInterface } from "@/models/user";
import { Session } from "next-auth";
import { z } from "zod";

export const signInSchema = z.object({
  email: z.string({ error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z.string({ error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be more than 6 characters")
    .max(32, "Password must be less than 32 characters"),
})

export interface CustomSession extends Session {
  user: {
    _id?: string;
    name: string;
    id: string;
    email: string;
    avatar?: string;
    role: UserInterface["role"];
  }
}