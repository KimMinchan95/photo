"use client";

import { useTranslations } from "next-intl";
import { Fragment } from "react";

import { DESCRIPTION_FONT } from "@shared/config";
import { Link, usePathname } from "@shared/i18n/navigation";
import { cn } from "@shared/lib";

const navItems = [
    { href: "/", labelKey: "Index" as const, number: "01" },
    { href: "/work", labelKey: "Work" as const, number: "02" },
    { href: "/archive", labelKey: "Archive" as const, number: "03" },
    { href: "/contact", labelKey: "Contact" as const, number: "04" },
];

export function HeaderNav({
    onNavigate,
    orientation = "horizontal",
    variant = "meta",
}: {
    onNavigate?: () => void;
    orientation?: "horizontal" | "vertical";
    variant?: "meta" | "sheet";
}) {
    const t = useTranslations("Nav");
    const pathname = usePathname();
    const isVertical = orientation === "vertical";
    const isSheet = variant === "sheet";

    return (
        <nav
            className={cn(
                "flex",
                isSheet && "flex-col items-stretch",
                isVertical && !isSheet && "flex-col items-start gap-2",
                !isVertical && "flex-row items-center gap-1",
            )}
            aria-label="Navigation"
        >
            {navItems.map(({ href, labelKey, number }, index) => {
                const isActive =
                    href === "/"
                        ? pathname === "/"
                        : pathname === href || pathname.startsWith(`${href}/`);

                return (
                    <Fragment key={labelKey}>
                        {index > 0 && !isVertical && !isSheet ? (
                            <span
                                className={cn(DESCRIPTION_FONT, "text-(--text-gray)")}
                                aria-hidden="true"
                            >
                                |
                            </span>
                        ) : null}
                        <Link
                            href={href}
                            onClick={onNavigate}
                            aria-current={isActive ? "page" : undefined}
                            className={cn(
                                isSheet &&
                                    "group animate-header-nav font-display flex min-h-18 items-center gap-5 border-b border-black/10 py-4 transition-colors motion-reduce:animate-none dark:border-white/10",
                                isSheet &&
                                    (isActive
                                        ? "text-current"
                                        : "text-(--text-gray) hover:text-current"),
                                !isSheet && DESCRIPTION_FONT,
                                !isSheet && "transition-opacity hover:opacity-80",
                                !isSheet && !isActive && "font-bold text-(--text-gray)",
                            )}
                            style={isSheet ? { animationDelay: `${index * 50 + 80}ms` } : undefined}
                        >
                            {isSheet ? (
                                <>
                                    <span
                                        className={cn(
                                            "w-8 shrink-0 font-sans text-xs tracking-[0.16em]",
                                            isActive ? "text-current" : "text-(--text-gray)",
                                        )}
                                    >
                                        {number}
                                    </span>
                                    <span
                                        className={cn(
                                            "text-[clamp(2.5rem,11vw,3.75rem)] leading-[0.9] tracking-tight",
                                        )}
                                    >
                                        {t(labelKey)}
                                    </span>
                                    <span
                                        className={cn(
                                            "ml-auto font-sans text-[11px] tracking-[0.18em] uppercase transition-opacity",
                                            isActive
                                                ? "opacity-100"
                                                : "opacity-0 group-hover:opacity-40",
                                        )}
                                        aria-hidden
                                    >
                                        →
                                    </span>
                                </>
                            ) : (
                                t(labelKey)
                            )}
                        </Link>
                    </Fragment>
                );
            })}
        </nav>
    );
}
