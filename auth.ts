import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/app/lib/prisma";
import GitHub from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", required: true },
      },
      async authorize(credentials) {
        const { email } = credentials as { email: string };

        if (!email) throw new Error("Email is required");

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) throw new Error("No user found with this email");

        return user;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token?.id) session.user.id = token.id as string;
      return session;
    },
  },

  // pages: {
  //   signIn: "/",
  // },

  secret: process.env.AUTH_SECRET,
});
