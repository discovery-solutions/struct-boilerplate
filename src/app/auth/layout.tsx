import { Providers } from "@/providers";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      {children}
    </Providers>
  );
}
