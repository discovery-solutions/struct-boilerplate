"use client";
import { ReactNode, Suspense } from "react";
import { StructUIProvider } from "@discovery-solutions/struct/client";
import { SessionProvider } from "@/services/auth/session";
import { Toaster } from "@/components/ui/sonner";
import { config } from "./config";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Suspense>
      <StructUIProvider config={config}>
        <SessionProvider>
          <Toaster />
          {children}
        </SessionProvider>
      </StructUIProvider>
    </Suspense>
  )
}