"use client";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

enum Error {
  Configuration = "Configuration",
  AccessDenied = "AccessDenied",
  Verification = "Verification",
  Default = "Default",
}

const ErrorMessage = ({ error, children }: { children: ReactNode, error: keyof typeof Error }) => (
  <>
    <p>{children}</p>
    <p className="mt-2">
      Código único do erro:{" "}
      <code className="rounded-sm bg-slate-100 p-1 text-xs">{error}</code>
    </p>
  </>
)

const errorMap = {
  [Error.Configuration]: (
    <ErrorMessage error="Configuration">Houve um problema ao tentar autenticar. Por favor, contate o suporte se este erro persistir.</ErrorMessage>
  ),
  [Error.AccessDenied]: (
    <ErrorMessage error="AccessDenied">Acesso negado. Você não possui permissão para entrar no sistema.</ErrorMessage>
  ),
  [Error.Verification]: (
    <ErrorMessage error="Verification">Falha na verificação. O token pode ter expirado ou já foi utilizado.</ErrorMessage>
  ),
  [Error.Default]: (
    <p>
      Ocorreu um erro inesperado. Por favor, contate o suporte caso o problema persista.
    </p>
  ),
};

export default function AuthErrorPage() {
  const search = useSearchParams();
  const error = search.get("error") as Error;

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
      <div className="block max-w-sm rounded-lg border border-gray-200 p-6 text-center shadow dark:border-primary/15">
        <h5 className="mb-2 flex flex-row items-center justify-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Tivemos um problema
        </h5>
        <div className="font-normal text-gray-700 dark:text-gray-400">
          {errorMap[error] || errorMap[Error.Default]}
        </div>
      </div>
      <Button asChild variant="outline">
        <Link href="/auth">Tentar Novamente</Link>
      </Button>
    </div>
  );
}
