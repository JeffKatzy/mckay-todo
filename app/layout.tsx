import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import { getProfileByUserId } from "@/db/queries/profiles-queries";
import "./globals.css";
import { createProfileAction } from "@/actions/profiles-actions";
import { Providers } from "@/components/utilities/providers";
import { auth } from "@clerk/nextjs/server";
import Header from "./header";
import { signInAction } from "@/actions/profiles-actions";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Todo App",
  description: "Todo App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = auth();

  if (userId) {
    const profile = await getProfileByUserId(userId);
    if (!profile) {
      await createProfileAction({ userId });
    }
  }
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
      >
        <Providers attribute="class"  enableSystem>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
    </ClerkProvider>
  );
}
