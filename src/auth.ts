import { CustomSession } from "@/services/auth/utils";
import { AuthService } from "@/services/auth";
import { authConfig } from "@/services/auth/config";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        const { status, user: original } = await AuthService.getUserOrCreate({
          id: user?.id as string,
          name: user?.name as string,
          email: user?.email,
          avatar: user?.picture,
          role: "user",
        });

        if (!status)
          throw new Error("User doesn't exist");

        token.user = {
          _id: original._id,
          id: user.id,
          name: user.name,
          email: user.email,
          role: original.role,
          avatar: user.avatar,
        };
      }

      return token;
    },

    async session({ session, token }: any) {
      session.user = token.user;
      session._id = token.user._id;
      session.id = token.user._id;
      session.providerId = token.user.id;
      return session;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      const safeUrl = new URL(url);
      return safeUrl.origin === baseUrl ? url : baseUrl;
    },
  }
});

export const getSession = async (): Promise<CustomSession> => {
  const DEFAULT_SESSION = { user: { role: "*" } } as CustomSession;

  try {
    const session = (await auth()) as CustomSession;

    return session || DEFAULT_SESSION;
  } catch (error) {
    console.error(error);
    return DEFAULT_SESSION;
  }
};

export const providerMap = authConfig.providers
  .map((provider: any) => {
    if (typeof provider === "function") {
      const providerData = provider();
      return { id: providerData.id, name: providerData.name };
    }
    return { id: provider.id, name: provider.name };
  })
  .filter((provider: any) => provider.id !== "credentials");