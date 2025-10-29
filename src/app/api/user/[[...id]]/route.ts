import { User, userFormSchema, UserInterface } from "@/models/identity/user/model";
import { CRUDController, HookContext } from "@/struct";
import { AuthService } from "@/services/auth";

function sanitizeUser(user: UserInterface) {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  } as any;
}

export const { GET, POST, DELETE, PATCH, dynamic, runtime } = new CRUDController(User, {
  createSchema: userFormSchema,
  updateSchema: userFormSchema,
  softDelete: !true,
  hooks: {
    beforeCreate: async ({ data }: HookContext<UserInterface>) => {
      if (!data?.password) return;
      const hashedPassword = await AuthService.hashPassword(data.password);
      return { password: hashedPassword };
    },
    beforeUpdate: async ({ data }: HookContext<UserInterface>) => {
      if (!data?.password) return;
      const hashedPassword = await AuthService.hashPassword(data.password);
      return { password: hashedPassword };
    },
    beforeSend: async (data) => {
      if (Array.isArray(data)) return data.map(sanitizeUser);
      return sanitizeUser(data as UserInterface);
    }
  },
  roles: {
    GET: ["admin"],
    POST: ["admin"],
    PATCH: ["admin"],
    DELETE: ["admin"],
  }
});