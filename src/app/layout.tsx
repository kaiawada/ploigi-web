import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Navibar from "./components/Navibar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ploigi project",
  description: "Ploigi project is a web application for managing your cultivating environment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        {/* ---------------------------------------------------- */}
        <Navibar />

        {/* ---------------------------------------------------- */}

        {children}

        {/* ---------------------------------------------------- */}
        <footer className="text-gray-600 body-font">
          <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
            <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
              <span className="ml-3 text-xl">Ploigi</span>
            </a>
            <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2026 Ploigi —
              <a href="https://twitter.com/knyttneve" className="text-gray-600 ml-1" rel="noopener noreferrer" target="_blank">@kaiawada</a>
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">

            </span>
          </div>
        </footer>

      </body>
    </html>
  );
}
