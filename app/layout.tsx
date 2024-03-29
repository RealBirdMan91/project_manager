import clsx from "clsx";
import "./globals.css";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./providers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Navbar from "@/components/shared/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ auth, dashboard }: RootLayout) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className="h-full bg-white">
      <body className={clsx("h-full", inter.className)}>
        <NextAuthProvider>
          {session ? (
            <>
              <Navbar /> {dashboard}
            </>
          ) : (
            auth
          )}
        </NextAuthProvider>
        <div id="modal"></div>
      </body>
    </html>
  );
}
