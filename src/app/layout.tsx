import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FT Nutrition | Entrenador Personal Profesional",
  description:
    "Transforma tu cuerpo y tu vida con un entrenador personal certificado. Planes personalizados, seguimiento continuo y resultados garantizados.",
  keywords: [
    "entrenador personal",
    "fitness",
    "transformación física",
    "nutrición",
    "entrenamiento personalizado",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-dvh flex flex-col bg-dark text-text">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
