import { Analytics } from "@vercel/analytics/next";
import { Black_Han_Sans, IBM_Plex_Sans_KR } from "next/font/google";

import { cn } from "@shared/lib";

import { Providers } from "./providers";

import type { Metadata } from "next";
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

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: "Chan's photo",
    description: "김민찬의 사진. 인물, 거리, 풍경 등 추억의 순간들을 담은 공간입니다.",
    openGraph: {
        title: "Chan's photo",
        description: "김민찬의 사진. 인물, 거리, 풍경 등 추억의 순간들을 담은 공간입니다.",
        images: [
            {
                url: "/og.jpg",
                width: 682,
                height: 1024,
                alt: "Chan's photo",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        images: ["/og.jpg"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" suppressHydrationWarning>
            <body
                className={cn(
                    manrope.variable,
                    blackHanSans.variable,
                    "bg-white text-zinc-950 antialiased",
                    "[.dark_&]:bg-black [.dark_&]:text-zinc-50",
                )}
                suppressHydrationWarning
            >
                <Providers>{children}</Providers>
                <Analytics />
            </body>
        </html>
    );
}
