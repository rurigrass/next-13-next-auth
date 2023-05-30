import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }
        //Find user
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        //Check if theres no user
        if (!user || !user?.hashedPassword) {
          return null;
        }
        //Check password is valid
        const isPasswordValid = await compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isPasswordValid) {
          return null;
        }

        //Check password
        return {
          id: user.id + "",
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
};
