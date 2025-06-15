import { signIn } from "@/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);

    const { email } = body;

    const user = await signIn("credentials", { email, redirect: false });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(`Error signing in:${error}`, { status: 400 });
  }
}
