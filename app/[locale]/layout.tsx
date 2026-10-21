import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";

import { routing } from "@shared/i18n/routing";
import { cn } from "@shared/lib";

import { Sidebar } from "@widgets/sidebar";

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
            <Sidebar />
            <main
                className={cn(
                    "min-w-0 pb-20 max-[800px]:px-[25px] max-[800px]:pt-3.5",
                    "min-[801px]:ml-[207px] min-[801px]:pt-[30px] min-[801px]:pr-[25px] min-[801px]:pb-[120px]",
                )}
            >
                {children}
            </main>
        </NextIntlClientProvider>
    );
}
