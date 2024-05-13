import type {Metadata} from "next";

import "./globals.css";
import {Suspense} from "react";

import {ThemeProvider} from "@/providers/theme-provider";
import {ModalProvider} from "@/providers/modal-provider";
import {Toaster} from "@/components/ui/sonner";
import AuthProvider from "@/providers/session-provider";
import SearchBarFallback from "@/components/fallbacks/search-bar-fallback";
import {db} from "@/lib/db";
import {auth} from "auth";
import {Menu} from "@/components/menu";
import {getUserById} from "@/data/user";

export const metadata: Metadata = {
  title: "lules-denuncias",
  description: "lules-denuncias",
};

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const categories = await db.category.findMany({});
  const session = await auth();

  const user = await getUserById(session?.user?.id);

  return (
    <html lang="en">
      <body>
        <ThemeProvider enableSystem attribute="class" defaultTheme="dark">
          <AuthProvider>
            <ModalProvider />
            <Toaster />
            <Suspense fallback={<SearchBarFallback />}>
              <Menu categories={categories} user={user} />
            </Suspense>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
