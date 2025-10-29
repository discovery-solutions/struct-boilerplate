import { providerMap } from "@/auth";
import { getSession } from "@/auth";
import { LoginForm } from "@/components/login-form";
import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { Card } from "@/components/ui/card";

export default async function AuthPage() {
  const providers = Object.values(providerMap);
  const { user } = await getSession();

  if (user?.email) return redirect("/dashboard");

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-md">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0 border-primary/50">
            <LoginForm action={signIn as any} providers={providers} />
          </Card>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            Ao clicar em continuar, você concorda com nossos <a href="/terms/use">Termos de Serviço</a>{" "}
            e <a href="/terms/privacy">Política de Privacidade</a>.
          </div>
        </div>
      </div>
    </div>
  )
}
