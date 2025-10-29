import z from "zod";

export const envSchema = z.object({
  NODE_ENV: z.string().default("development"),
  MONGODB_URI: z.string().min(6),
  MONGODB_NAME: z.string().min(3),
  AUTH_SECRET: z.string().min(16),
  AUTH_URL: z.url(),
  PLATFORM_API_KEY: z.string().min(16),
  AUTH_GOOGLE_ID: z.string().optional(),
  AUTH_GOOGLE_SECRET: z.string().optional(),
  OPENAI_API_KEY: z.string().min(32),
  BLOB_READ_WRITE_TOKEN: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;
const parsed = envSchema.safeParse(process.env);

if (typeof window === "undefined" && !parsed.success) {
  console.log(parsed);
  throw new Error("Erro na validação das variáveis de ambiente: ");
}

interface PickerParams {
  development: any;
  production: any;
  test?: any;
}

export const ENV = {
  ...process.env,
  picker: (params: PickerParams) => {
    const key = ENV.NODE_ENV || "development";
    return params[key as keyof typeof params] || params.development;
  },
} as Env & { picker: (params: PickerParams) => any };