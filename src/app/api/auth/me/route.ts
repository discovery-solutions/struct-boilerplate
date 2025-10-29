import { withSession } from "@/struct";
import { signOut } from "@/auth";
import { User } from "@/models/user/model";

export const GET = withSession(async ({ user }) => {
  const original = await User.findOne({ email: user?.email });

  if (!original) {
    await signOut({ redirect: false });
    return Response.json({ message: "Forbidden" }, { status: 403 });
  }

  return Response.json({
    ...user,
    _id: original?._id,
    name: original?.name,
    role: original?.role,
    status: original?.status,
    avatar: original?.avatar,
  });
});