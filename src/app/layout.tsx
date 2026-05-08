import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CNS_MODULE.v1.0",
  description: "Computer Network Security showcase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
