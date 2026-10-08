import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Providers } from "@/components/Providers";
import { site } from "@/data/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: site.conceptLabel,
  description:
    "Discover careers across Reliance — digital, retail, energy, new energy, media and corporate functions. A homepage design concept.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#171a4a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${manrope.variable} antialiased`}>
      <body className="min-h-dvh overflow-x-clip">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
