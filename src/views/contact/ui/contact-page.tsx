import { getTranslations } from "next-intl/server";

import { NAME_FONT } from "@shared/config";
import { cn } from "@shared/lib";

import { CONTACT_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "../model/links";

const rowClass = cn(
    "grid grid-cols-1 items-baseline gap-1 border-b border-black/10 py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-8",
    "dark:border-white/10",
);

const valueClass = cn("m-0 font-sans text-sm tracking-wide");

const linkClass = cn("transition-opacity hover:opacity-60");

export async function ContactPage() {
    const t = await getTranslations("Contact");

    const details: {
        label: string;
        value: string;
        href?: string;
        external?: boolean;
    }[] = [
        {
            label: t("Instagram"),
            value: INSTAGRAM_HANDLE,
            href: INSTAGRAM_URL,
            external: true,
        },
        { label: t("Based in"), value: t("Location") },
        { label: t("Practice"), value: t("Personal") },
    ];

    return (
        <section className={cn("pt-[12vh] pb-[max(3rem,env(safe-area-inset-bottom))]")}>
            <div
                className={cn(
                    "grid items-end gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(16rem,0.8fr)]",
                )}
            >
                <div>
                    <p className={cn(NAME_FONT)}>{t("Email")}</p>
                    <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className={cn(
                            "mt-3 block font-sans text-[clamp(1.65rem,4.4vw,3rem)] leading-none font-medium tracking-[-0.045em] break-all",
                            "underline decoration-transparent underline-offset-[0.18em] transition-[opacity,text-decoration-color] duration-200 hover:decoration-current hover:opacity-70",
                        )}
                    >
                        {CONTACT_EMAIL}
                    </a>
                </div>

                <dl className={cn("border-t border-black/10 dark:border-white/10")}>
                    {details.map((detail) => (
                        <div key={detail.label} className={rowClass}>
                            <dt className={cn(NAME_FONT)}>{detail.label}</dt>
                            <dd className={valueClass}>
                                {detail.href ? (
                                    <a
                                        href={detail.href}
                                        target={detail.external ? "_blank" : undefined}
                                        rel={detail.external ? "noreferrer" : undefined}
                                        className={linkClass}
                                    >
                                        {detail.value}
                                    </a>
                                ) : (
                                    detail.value
                                )}
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
}
