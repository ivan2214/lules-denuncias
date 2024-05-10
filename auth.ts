import type {NextAuthConfig, Session} from "next-auth";

import "next-auth/jwt";
import {PrismaAdapter} from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Auth0 from "next-auth/providers/auth0";
import Facebook from "next-auth/providers/facebook";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Twitter from "next-auth/providers/twitter";
import {type JWT} from "next-auth/jwt";

import {db} from "@/lib/db";

export const config = {
  adapter: PrismaAdapter(db),
  theme: {logo: "https://authjs.dev/img/logo-sm.png"},
  providers: [Auth0, Facebook, GitHub, Google, Twitter],
  basePath: "/auth",
  callbacks: {
    authorized({request, auth}) {
      const {pathname} = request.nextUrl;

      if (pathname === "/middleware-example") return !!auth;

      return true;
    },
    jwt({token, trigger, session}): JWT {
      if (trigger === "update") token.name = session.user.name;

      return token;
    },
    async session({session, token}): Promise<Session> {
      session.accessToken = token.accessToken;

      return Promise.resolve(session);
    },
  },
} satisfies NextAuthConfig;

export const {handlers, auth, signIn, signOut} = NextAuth(config);

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
  }
}
