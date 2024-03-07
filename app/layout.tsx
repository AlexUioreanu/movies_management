import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Logout from "./logout";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <link rel="shortcut icon" href="/logo.svg" />
      <link rel="icon" sizes="32x32" href="/logo.svg" />
      <link rel="icon" sizes="16x16" href="/logo.svg" />
      <body className={inter.className}>
        <nav>
          {!!session && <Logout />}
          {!session && <Link href="/login">Login</Link>}
        </nav>
        {children}
      </body>
    </html>
  );
}
