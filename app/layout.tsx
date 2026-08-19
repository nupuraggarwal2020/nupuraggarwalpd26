import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageFade } from "@/components/PageFade";
import "./globals.css";

const saans = localFont({
  src: [
    {
      path: "../public/fonts/Saans-TRIAL-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Saans-TRIAL-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Saans-TRIAL-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-saans",
  display: "swap",
});

const saansMono = localFont({
  src: "../public/fonts/SaansMono-TRIAL-Regular.otf",
  weight: "400",
  variable: "--font-saans-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nupur.works"),
  title: "Nupur Aggarwal — Product Designer",
  description:
    "I design how complex technical systems become usable products. AI-powered workflows and developer ecosystems at Canva, in collaboration with OpenAI and Anthropic.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${saans.variable} ${saansMono.variable}`}
    >
      <body>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-42FH7DW24K"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-42FH7DW24K');
          `}
        </Script>
        <Nav />
        <PageFade>{children}</PageFade>
        <Footer />
      </body>
    </html>
  );
}
