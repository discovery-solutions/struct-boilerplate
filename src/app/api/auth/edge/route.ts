import { startConnection } from "@/lib/mongoose";
import { ModelService } from "@/struct";
import { NextRequest } from "next/server";
import { User } from "@/models/user/model";
import { ENV } from "@/env";

export const POST = async (req: NextRequest) => {
  try {
    const apiKey = req.headers.get("authorization");
    if (apiKey !== ENV.PLATFORM_API_KEY)
      return Response.json({ error: "Unauthorized" }, { status: 401 });

    await startConnection();
    const body = await req.json();
    const { email, name, avatar } = body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        status: "active",
        avatar: avatar || null,
        email: email,
        name: name || email.split("@")[0],
        role: "user",
      });
    }

    return Response.json({ status: !!user, user });
  } catch (error: any) {
    console.log("Auth error:", error.message);
    return Response.json({ status: false, error: error.message });
  }
};


export const PATCH = async (req: NextRequest) => {
  try {
    const apiKey = req.headers.get("authorization");

    if (apiKey !== ENV.PLATFORM_API_KEY)
      return Response.json({ error: "Unauthorized" }, { status: 401 });

    await startConnection();
    const body = await req.json();
    delete body.id;

    const service = new ModelService(User);
    const data = await service.findOne({ email: body.email, status: "active" });

    return Response.json({ ok: true });
  } catch (error) {
    console.log(error);
    return Response.json(error, { status: 500 });
  }
}