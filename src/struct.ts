import { startConnection } from "@/lib/mongoose";
import { getSession } from "@/auth";
import { Struct } from "@discovery-solutions/struct";

export * from "@discovery-solutions/struct";

Struct.configure({
  database: { startConnection },
  auth: { getSession },
});