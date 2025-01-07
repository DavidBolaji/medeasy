import type { Metadata } from "next";
import "./globals.css";
import { TanstackProvider } from "@/tanstack/tanstack-provider";
import NavBar from "@/components/navbar/navbar";
import Wrapper from "@/components/wrapper/wrapper";


export const metadata: Metadata = {
  title: "Medeasy",
  description:
    "",
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
