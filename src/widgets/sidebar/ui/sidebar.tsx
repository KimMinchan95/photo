"use client";

import { Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useState } from "react";

import { Link, usePathname } from "@shared/i18n/navigation";
import { cn } from "@shared/lib";

import { LiveClock } from "@features/live-click";
import { ThemeToggle } from "@features/theme-toggle";

import { CONTACT_EMAIL, INSTAGRAM_URL } from "@views/contact/model/links";
import { workCopy, works } from "@views/work/model/works";

const linkClass = cn("font-sans text-xs leading-[1.95] lowercase transition-colors");

function itemClass(isActive: boolean) {
    return cn(
        linkClass,
        isActive ? "text-(--accent)" : "text-(--text-gray) hover:text-(--accent)",
    );
}

export function Sidebar() {
    const pathname = usePathname();
    const locale = useLocale();
    const t = useTranslations("Nav");
    const menu = useTranslations("Header");
    const [isOpen, setIsOpen] = useState(false);
    const panelId = useId();

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = "";
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen]);

    const close = () => setIsOpen(false);

    return (
        <aside
            className={cn(
                "z-40 bg-white dark:bg-black",
                "max-[800px]:sticky max-[800px]:top-0 max-[800px]:border-b max-[800px]:border-black/10 dark:max-[800px]:border-white/10",
                isOpen && "max-[800px]:h-dvh max-[800px]:overflow-y-auto",
                "min-[801px]:fixed min-[801px]:top-[30px] min-[801px]:left-[25px] min-[801px]:max-h-[calc(100dvh-48px)] min-[801px]:w-[150px] min-[801px]:overflow-y-auto min-[801px]:border-0 min-[801px]:bg-transparent",
            )}
        >
            <div
                className={cn(
                    "flex items-center justify-between max-[800px]:px-[25px] max-[800px]:py-3",
                )}
            >
                <Link
                    href="/"
                    onClick={close}
                    className={cn(
                        "font-sans text-[25px] leading-[1.44] font-normal uppercase",
                        "max-[800px]:text-lg max-[800px]:leading-tight",
                    )}
                >
                    <span className={cn("block max-[800px]:inline")}>Kim</span> <span>Minchan</span>
                </Link>
                <button
                    type="button"
                    className={cn("flex size-9 items-center justify-center min-[801px]:hidden")}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    aria-label={isOpen ? menu("Close menu") : menu("Open menu")}
                    onClick={() => setIsOpen((open) => !open)}
                >
                    {isOpen ? (
                        <X className={cn("size-5")} strokeWidth={1.5} aria-hidden />
                    ) : (
                        <Menu className={cn("size-5")} strokeWidth={1.5} aria-hidden />
                    )}
                </button>
            </div>

            <div
                id={panelId}
                className={cn(
                    "min-[801px]:mt-5 min-[801px]:block",
                    "max-[800px]:px-[25px] max-[800px]:pb-6",
                    isOpen ? "block" : "max-[800px]:hidden",
                )}
            >
                <nav aria-label="Navigation">
                    <ul className={cn("m-0 list-none p-0")}>
                        {works.map((work, index) => {
                            const href = `/work/${work.slug}`;
                            const isActive =
                                pathname === href ||
                                ((pathname === "/" || pathname === "/work") && index === 0);

                            return (
                                <li key={work.slug}>
                                    <Link
                                        href={href}
                                        onClick={close}
                                        aria-current={isActive ? "page" : undefined}
                                        className={itemClass(isActive)}
                                    >
                                        {workCopy(work.title, locale)}
                                    </Link>
                                </li>
                            );
                        })}
                        <li aria-hidden="true">
                            <span className={cn(linkClass, "text-(--text-gray)")}>--------</span>
                        </li>
                        <li>
                            <Link
                                href="/archive"
                                onClick={close}
                                aria-current={
                                    pathname === "/archive" || pathname.startsWith("/archive/")
                                        ? "page"
                                        : undefined
                                }
                                className={itemClass(
                                    pathname === "/archive" || pathname.startsWith("/archive/"),
                                )}
                            >
                                {t("Archive")}
                            </Link>
                        </li>
                        <li>
                            <a
                                href={`mailto:${CONTACT_EMAIL}`}
                                onClick={close}
                                className={itemClass(false)}
                            >
                                {t("Contact")}
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className={cn("mt-4")}>
                    <a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noreferrer"
                        className={cn(linkClass, "text-current hover:opacity-60")}
                    >
                        instagram
                    </a>
                </div>

                <p className={cn("mt-4 font-sans text-xs leading-[1.95] text-(--text-gray)")}>
                    Seoul, Korea
                    <br />
                    <LiveClock />
                </p>
                <div className={cn("mt-3")}>
                    <ThemeToggle />
                </div>
            </div>
        </aside>
    );
}
