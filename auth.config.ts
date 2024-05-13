import type {NextAuthConfig} from "next-auth"

import GitHub from "next-auth/providers/github"
import google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import {type User} from "@prisma/client"

import {LoginSchema} from "@/schemas"
import {getUserByEmail} from "@/data/user"

export default {
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if (validatedFields.success) {
          const {email, password} = validatedFields.data

          const user = await getUserByEmail(email)

          if (!user?.hashPassword) {
            return null
          }

          const {hashPassword}: User = user
          const isValid = await bcrypt.compare(password, hashPassword)

          if (isValid) {
            return user
          }
        }

        return null
      },
    }),
  ],
} satisfies NextAuthConfig
