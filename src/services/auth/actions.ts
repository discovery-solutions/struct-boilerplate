'use server';
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";

export async function socialSignIn(providerId: string, callbackUrl?: string) {
  try {
    await signIn(providerId, { redirectTo: callbackUrl ?? "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      console.log(error)
      if (callbackUrl) return redirect(callbackUrl);
      return redirect(`/auth/error?error=${error.type}`);
    }
    throw error;
  }
}


/**
 * Server Action to perform credential sign-in.
 * Must be called from a Client Component.
 */
export async function signinWithCredentials(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const callbackUrl = formData.get("callbackUrl")?.toString() || "/dashboard";

  if (!email || !password) throw new Error("Email e senha obrigatórios");

  await signIn("credentials", {
    email,
    password,
    redirectTo: callbackUrl,
  });
}

