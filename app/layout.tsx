import type { Metadata } from "next";
import { Black_Han_Sans, IBM_Plex_Sans_KR } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const manrope = IBM_Plex_Sans_KR({
    variable: "--font-sans",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});

const blackHanSans = Black_Han_Sans({
    variable: "--font-display",
    subsets: ["latin"],
    weight: ["400"],
});

export const metadata: Metadata = {
    title: "Photo",
    description: "Photo",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" suppressHydrationWarning>
            <body className={`${manrope.variable} ${blackHanSans.variable} antialiased`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
