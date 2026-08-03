import { Sora, Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata = {
  title: "BNF – Building Future-Ready Students",
  description: "BNF empowers students through psychometric assessments, career mapping, guided journaling, and holistic development programs across India.",
  openGraph: {
    title: "BNF – Building Future-Ready Students",
    description: "Empowering students through career guidance and holistic development.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-[#FAFAF7] text-[#0F1F1F] antialiased">
        <AuthProvider>
          <SmoothScrollProvider>
            <CustomCursor />
            <ScrollProgress />
            {children}
          </SmoothScrollProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

