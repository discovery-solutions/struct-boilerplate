import { getSession } from "@/auth";
import { redirect } from "next/navigation";
import { Layout } from "@/providers/layout";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (session.user?.role !== "admin")
    return redirect("/app");

  return <Layout>{children}</Layout>;
}