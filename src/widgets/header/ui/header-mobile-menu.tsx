"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useId, useState } from "react";

import { HeaderLocation, HeaderNavigation, HeaderTheme } from "./header-sections";

const menuButtonClass =
    "flex size-10 items-center justify-center rounded-sm border border-zinc-700 bg-zinc-800 text-white shadow-sm transition-opacity hover:opacity-80 dark:border-zinc-500 dark:bg-zinc-700";
const menuIconClass = "size-5";
const menuPanelClass =
    "header-mobile-menu absolute top-full right-0 z-50 mt-3 flex w-72 max-w-[calc(100vw-2rem)] flex-col gap-3 rounded-sm border border-black/10 bg-white p-4 text-zinc-900 shadow-sm dark:border-white/10 dark:bg-black dark:text-zinc-50";

export function HeaderMobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const panelId = useId();
    const t = useTranslations("Header");

    useEffect(
        function addEscapeListener() {
            if (!isOpen) {
                return;
            }

            const handleEscape = (event: KeyboardEvent) => {
                if (event.key === "Escape") {
                    setIsOpen(false);
                }
            };

            document.addEventListener("keydown", handleEscape);
            return function removeEscapeListener() {
                document.removeEventListener("keydown", handleEscape);
            };
        },
        [isOpen],
    );

    useEffect(
        function lockBodyScroll() {
            if (!isOpen) {
                return;
            }

            document.body.style.overflow = "hidden";
            return function unlockBodyScroll() {
                document.body.style.overflow = "";
            };
        },
        [isOpen],
    );

    const closeMenu = () => setIsOpen(false);

    return (
        <div className="relative shrink-0">
            <button
                type="button"
                className={menuButtonClass}
                aria-expanded={isOpen}
                aria-controls={panelId}
                aria-label={isOpen ? t("Close menu") : t("Open menu")}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {isOpen ? (
                    <X className={menuIconClass} strokeWidth={2} aria-hidden />
                ) : (
                    <Menu className={menuIconClass} strokeWidth={2} aria-hidden />
                )}
            </button>

            {isOpen ? (
                <>
                    <button
                        type="button"
                        className="fixed inset-0 z-40 cursor-default bg-black/20"
                        aria-label={t("Close menu")}
                        onClick={closeMenu}
                    />
                    <div id={panelId} className={menuPanelClass}>
                        <HeaderLocation />
                        <HeaderNavigation orientation="vertical" compact onNavigate={closeMenu} />
                        <HeaderTheme />
                    </div>
                </>
            ) : null}
        </div>
    );
}
