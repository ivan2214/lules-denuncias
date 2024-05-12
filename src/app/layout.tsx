import type {Metadata} from "next";

import Link from "next/link";
import {OctagonAlertIcon} from "lucide-react";

import "./globals.css";
import {ThemeProvider} from "@/providers/theme-provider";
import {ButtonOpenModal} from "@/components/button-open-modal";
import ModeToggle from "@/components/mode-toggle";
import {ModalProvider} from "@/providers/modal-provider";
import {Toaster} from "@/components/ui/sonner";
import {MenuAuth} from "@/components/menu-auth";
import AuthProvider from "@/providers/session-provider";

export const metadata: Metadata = {
  title: "lules-denuncias",
  description: "Generated by appncy",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider enableSystem attribute="class" defaultTheme="dark">
          <AuthProvider>
            <ModalProvider />
            <Toaster />
            <header className="container flex items-center justify-between border-b px-4 lg:px-6 lg:py-5">
              <Link className="flex items-center justify-center" href="/">
                <OctagonAlertIcon className="h-6 w-6" />
                <span className="sr-only">Community Complaints</span>
              </Link>

              <nav className="ml-auto flex items-center gap-4 sm:gap-6">
                <Link className="text-sm font-medium underline-offset-4 hover:underline" href="/">
                  Inicio
                </Link>
                <Link className="text-sm font-medium underline-offset-4 hover:underline" href="#">
                  FAQs
                </Link>
                <Link className="text-sm font-medium underline-offset-4 hover:underline" href="#">
                  Contacto
                </Link>
                <MenuAuth />
                <ButtonOpenModal />
                <ModeToggle />
              </nav>
            </header>
            {children}
            <footer className="text-center leading-[4rem] opacity-70">
              © {new Date().getFullYear()} lules-denuncias
            </footer>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
