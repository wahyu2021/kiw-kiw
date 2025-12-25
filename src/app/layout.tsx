import type { Metadata, Viewport } from "next";
import { Outfit, Pacifico } from "next/font/google";
import "./globals.css";

/** Font Outfit untuk body text dengan berbagai weight */
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

/** Font Pacifico untuk decorative/script text */
const pacifico = Pacifico({
  variable: "--font-pacifico",
  subsets: ["latin"],
  weight: "400",
});

/** Metadata untuk SEO dan social sharing */
export const metadata: Metadata = {
  title: "Untuk Kamu ✨",
  description: "Sebuah website spesial yang dibuat untuk kamu, eaa",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✨</text></svg>",
  },
};

/** Viewport settings untuk responsive mobile */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0f0f1a",
};

/**
 * RootLayout Component
 * 
 * Layout utama aplikasi dengan font declarations dan globals CSS.
 * Menggunakan bahasa Indonesia dan anti-aliased text rendering.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${outfit.variable} ${pacifico.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
