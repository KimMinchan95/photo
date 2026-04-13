"use client";

import { useTranslations } from "next-intl";
import { Fragment } from "react";

import { DESCRIPTION_FONT } from "@shared/config";
import { Link, usePathname } from "@shared/i18n/navigation";
import { cn } from "@shared/lib";

const navItems = [
    { href: "/", labelKey: "Index" as const },
    { href: "/work", labelKey: "Work" as const },
    { href: "/archive", labelKey: "Archive" as const },
    { href: "/contact", labelKey: "Contact" as const },
];

export function HeaderNav() {
    const t = useTranslations("Nav");
    const pathname = usePathname();

    return (
        <nav className="flex items-center gap-1">
            {navItems.map(({ href, labelKey }, index) => {
                const isActive =
                    href === "/"
                        ? pathname === "/"
                        : pathname === href || pathname.startsWith(`${href}/`);

                return (
                    <Fragment key={labelKey}>
                        {index > 0 ? (
                            <span
                                className={cn(DESCRIPTION_FONT, "text-(--text-gray)")}
                                aria-hidden="true"
                            >
                                |
                            </span>
                        ) : null}
                        <Link
                            href={href}
                            className={cn(
                                DESCRIPTION_FONT,
                                "transition-opacity hover:opacity-80",
                                !isActive && "font-bold text-(--text-gray)",
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
