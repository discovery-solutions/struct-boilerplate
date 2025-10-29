import { signInSchema } from "@/services/auth/utils";
import { AuthService } from "@/services/auth";
import { ZodError } from "zod";
import Credentials from "next-auth/providers/credentials";

export const CredentialsProvider = Credentials({
  credentials: {
    email: {
      type: "email",
      label: "Email",
      placeholder: "johndoe@gmail.com",
    },
    password: {
      type: "password",
      label: "Password",
      placeholder: "*****",
    },
  },
  authorize: async (credentials) => {
    try {
      const { email, password } = await signInSchema.parseAsync(credentials);
      console.log("[Auth] Attempting login for:", email);

      const user = await AuthService.validateUser(email, password);

      if (!user) return null;

      console.log("[Auth] Authenticated user:", user.email, user.role);
      return user;
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        console.warn("[Auth] Invalid input schema", error.flatten());
      } else {
        console.error("[Auth] Error during authorization:", error);
      }

      throw error;
    }
  },
});
