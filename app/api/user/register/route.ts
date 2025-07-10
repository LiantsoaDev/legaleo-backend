import { prisma } from "@/lib/prisma";
import { exclude, hashPassword } from "@/utils/functions";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, password, last_name } = await req.json();
  const hashedPassword = await hashPassword(password);
  try {
    const user = await prisma.user.create({
      data: {
        last_name,
        email,
        name,
        password: hashedPassword,
      },
    });
    return new Response(
      JSON.stringify({
        success: 1,
        message: "Account created!",
        data: exclude(user, ["password"]),
      }),
      { status: 201 }
    );
  } catch (error: any) {
    console.log(error);
    return new Response(
      JSON.stringify({
        success: 0,
        message: "email or user already registered",
      })
    );
  }
}
