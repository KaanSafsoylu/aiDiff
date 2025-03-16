import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL('https://aidiff.example.com'),
  title: "aiDiff - Web Sayfası Karşılaştırma Aracı",
  description: "Gelişmiş yapay zeka ile iki web sayfasını karşılaştırın ve farklılıkları anında tespit edin",
  keywords: ["web karşılaştırma", "url diff", "website diff", "sayfa karşılaştırma", "web farklılık tespit"],
  authors: [{ name: "aiDiff Team" }],
  robots: "index, follow",
  icons: {
    icon: ['/favicon.svg'],
  },
  openGraph: {
    type: "website",
    title: "aiDiff - Web Sayfası Karşılaştırma Aracı",
    description: "Gelişmiş yapay zeka ile iki web sayfasını karşılaştırın ve farklılıkları anında tespit edin",
    siteName: "aiDiff",
    images: [{
      url: "/og-image.jpg",
      width: 1200,
      height: 630
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "aiDiff - Web Sayfası Karşılaştırma Aracı",
    description: "Gelişmiş yapay zeka ile iki web sayfasını karşılaştırın ve farklılıkları anında tespit edin",
    images: ["/og-image.jpg"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" />
      </head>
      <body className={`${inter.variable} font-sans min-h-screen antialiased`}>
        <Navbar />
        <div className="pt-16"> {/* Add padding for navbar */}
          {children}
        </div>
      </body>
    </html>
  );
}
