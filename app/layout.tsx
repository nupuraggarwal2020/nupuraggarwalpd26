import type { Metadata } from "next";
import localFont from "next/font/local";
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
      <body>{children}</body>
    </html>
  );
}
