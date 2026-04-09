import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";

import { routing } from "@shared/i18n/routing";

import { Header } from "@widgets/header";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        <NextIntlClientProvider>
            <Header />
            <main>{children}</main>
        </NextIntlClientProvider>
    );
}
