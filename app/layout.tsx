import type { Metadata } from "next";
import "./globals.css";
import { TanstackProvider } from "@/tanstack/tanstack-provider";
import NavBar from "@/components/navbar/navbar";

export const metadata: Metadata = {
  title: "Medeasy",
  description:
    "Connecting You with Reliable Help for All Your Household Tasks an Medical Tasks",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TanstackProvider>
          <NavBar />
          {children}
        </TanstackProvider>
      </body>
    </html>
  );
}
