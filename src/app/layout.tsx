import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import '@mantine/core/styles.css';

import { ColorSchemeScript, Container, mantineHtmlProps, Stack } from '@mantine/core';
import { Providers } from "./providers";
import { Navbar } from "@/components/nav/Navbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Star Wars Fleet Builder",
  description: "Create your own fleet. Now with 50% more of Force!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript></ColorSchemeScript>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <Container fluid pt={50}>
            <Stack gap="xl">
              <Navbar></Navbar>
              {children}
            </Stack>
          </Container>
        </Providers>
      </body>
    </html>
  );
}
