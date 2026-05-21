"use client";

import { useTranslations } from "next-intl";
import { Fragment } from "react";

import { HEADER_DESCRIPTION_FONT } from "@shared/config";
import { Link, usePathname } from "@shared/i18n/navigation";
import { cn } from "@shared/lib";

const navItems = [
    { href: "/", labelKey: "Index" as const },
    { href: "/work", labelKey: "Work" as const },
    { href: "/archive", labelKey: "Archive" as const },
    { href: "/contact", labelKey: "Contact" as const },
];

export function HeaderNav({
    onNavigate,
    orientation = "horizontal",
    compact = false,
}: {
    onNavigate?: () => void;
    orientation?: "horizontal" | "vertical";
    compact?: boolean;
}) {
    const t = useTranslations("Nav");
    const pathname = usePathname();
    const isVertical = orientation === "vertical";

    return (
        <nav
            className={cn(
                "flex gap-1",
                isVertical &&
                    (compact
                        ? "flex-col items-stretch gap-0"
                        : "flex-col items-start gap-2"),
                !isVertical && "flex-row items-center",
            )}
        >
            {navItems.map(({ href, labelKey }, index) => {
                const isActive =
                    href === "/"
                        ? pathname === "/"
                        : pathname === href || pathname.startsWith(`${href}/`);

                return (
                    <Fragment key={labelKey}>
                        {index > 0 && !isVertical ? (
                            <span
                                className={cn(
                                    HEADER_DESCRIPTION_FONT,
                                    "text-(--text-gray)",
                                )}
                                aria-hidden="true"
                            >
                                |
                            </span>
                        ) : null}
                        <Link
                            href={href}
                            onClick={onNavigate}
                            className={cn(
                                HEADER_DESCRIPTION_FONT,
                                "transition-opacity hover:opacity-80",
                                !isActive && "font-bold text-(--text-gray)",
                                isVertical &&
                                    compact &&
                                    "flex min-h-11 items-center leading-none",
                            )}
                        >
                            {t(labelKey)}
                        </Link>
                    </Fragment>
                );
            })}
        </nav>
    );
}
