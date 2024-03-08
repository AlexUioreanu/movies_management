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
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem",
            borderBottom: "8px solid orange",
            backgroundColor: "red",
            color: "white",
          }}
        >
          {!!session && (
            <>
              <div style={{ flex: 1 }}>
                <Logout />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flex: 1,
                  gap: "6rem",
                }}
              >
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/favorites">Favorites</Link>
              </div>
              <div style={{ flex: 1 }} />{" "}
            </>
          )}
          {!session && <Link href="/login">Login</Link>}
        </nav>
        {children}
      </body>
    </html>
  );
}
