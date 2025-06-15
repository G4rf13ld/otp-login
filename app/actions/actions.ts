"use server";

import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import axios, { Axios } from "axios";
import { signIn } from "@/auth";
import { emailServerSchema } from "../lib/validation";

interface loginUserProps {
  email: string;
}

export async function loginUserWithCredentials({ email }: loginUserProps) {
  const validatedData = await emailServerSchema.safeParseAsync(email);

  if (!validatedData.data) return NextResponse.json(`Bad email format`);

  await signIn("credentials", { email });
}

export async function createUserWithCredentials({ email }: loginUserProps) {
  console.log("create user", email);

  const validatedData = await emailServerSchema.safeParseAsync(email);

  if (!validatedData.success) return NextResponse.json(`Bad email format`);

  const isEmailTaken = await prisma.user.findMany({
    where: {
      email: email,
    },
  });

  if (isEmailTaken.length > 0)
    return NextResponse.json("Email taken", { status: 200 });

  console.log("Before creating user", email);
  const createdUser = await prisma.user.create({
    data: { email },
  });

  await signIn("credentials", { email });
}
