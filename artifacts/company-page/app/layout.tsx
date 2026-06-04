import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "akakAI",
  description:
    "Autonomous agents that navigate complexity, make decisions, and deliver outcomes.",
  icons: {
    icon: "/favicon-badge.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
