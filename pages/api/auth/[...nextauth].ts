// pages/api/auth/[...nextauth].js

import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from '@/libs/prismadb'
import Credentials from "next-auth/providers/credentials"
import bcrypt from 'bcrypt'


export const authOptions : AuthOptions =  {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
      Credentials({
  name: "credentials",
  credentials: {
    username: { label: "Kullanıcı Adı", type: "text" },
    password: { label: "Şifre", type: "password" },
  },
  async authorize(credentials) {
    if (!credentials?.username || !credentials?.password) {
      throw new Error("Kullanıcı adı ve şifre zorunlu.");
    }

    const user = await prisma.user.findFirst({
      where: {
        name: credentials.username, // ✅ name alanına göre arıyoruz
      },
    });

    if (!user || !user.hashedPassword) {
      throw new Error("Kullanıcı bulunamadı.");
    }

    const isCorrect = await bcrypt.compare(
      credentials.password,
      user.hashedPassword
    );

    if (!isCorrect) {
      throw new Error("Şifre yanlış.");
    }

    return user;
  }
}),

  ],
  pages : {
    signIn: "/login"
  },

  debug: process.env.NODE_ENV == "development",
  session: {
    strategy: "jwt"
  },
  secret: process.env.NEXTAUTH_SECRET
}

export default NextAuth(authOptions)
