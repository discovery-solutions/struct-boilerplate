import { getSession, signOut } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function SignOutPage() {
  const session = await getSession();

  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-xs md:max-w-sm">
        <Card className="bg-background border-primary/20">
          <CardContent className="flex flex-col items-center gap-6 p-8 text-center">
            <div>
              <h1 className="text-2xl font-bold">Sair da conta</h1>
              <p className="text-muted-foreground">Tem certeza que deseja sair?</p>
            </div>
            <form
              className="flex w-full flex-col gap-4"
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/auth" });
              }}
            >
              <Button type="submit" variant="destructive" className="w-full">
                Sair
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href={session?.user?.role === "admin" ? "/dashboard" : "/app"}>Cancelar</Link>
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
