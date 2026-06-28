import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rubik-S",
  description: "Interactive Rubik's Cube Solver",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}