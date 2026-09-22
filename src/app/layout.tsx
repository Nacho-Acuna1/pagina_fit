import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SplashScreen } from "@/components/ui/SplashScreen";
import { RegionSelector } from "@/components/ui/RegionSelector";
import { RegionProvider } from "@/hooks/useRegion";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FT Nutrition | Entrenador Personal Profesional",
  description:
    "Transforma tu cuerpo y tu vida con un entrenador personal certificado. Planes personalizados, seguimiento continuo y resultados garantizados.",
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
  keywords: [
    "entrenador personal",
    "fitness",
    "transformación física",
    "nutrición",
    "entrenamiento personalizado",
  ],
  openGraph: {
    title: "FT Nutrition | Transforma tu físico",
    description: "Planes de entrenamiento y nutrición 100% personalizados basados en ciencia y resultados reales.",
    url: "https://ftnutrition.com", // Cambiar por dominio real cuando se publique
    siteName: "FT Nutrition",
    images: [
      {
        url: "/images/transformations/Foto de Angel_Entrenador.jpeg",
        width: 1200,
        height: 630,
        alt: "Angel Castillo - Entrenador Personal",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FT Nutrition | Entrenador Personal",
    description: "Tu transformación física definitiva empieza aquí.",
    images: ["/images/transformations/Foto de Angel_Entrenador.jpeg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased overflow-x-hidden`}>
      <body className="min-h-dvh flex flex-col bg-dark text-text overflow-x-hidden relative w-full">
        <RegionProvider>
          <SplashScreen />
          <Navbar />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <Footer />
          <RegionSelector />
        </RegionProvider>
      </body>
    </html>
  );
}
