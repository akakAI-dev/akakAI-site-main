import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "akakAI — Company",
  description:
    "Pioneering the future of AI autonomy. AI agents that think independently, take initiative, and execute tasks with purpose.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}
