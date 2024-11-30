import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Footer from "../components/custom/Footer";
import Header from "../components/custom/Header";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Kevin Film",
  description:
    "Welcome to my shrine of genuine affection towards analogue photography",
  authors: [{ name: "fine-pine", url: "https://github.com/fine-pine" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="antialiased flex flex-col gap-16 items-center m-auto max-w-5xl min-h-screen">
            <Header />
            {children}
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
