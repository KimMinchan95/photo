"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { cn } from "@shared/lib";

import { LiveClock } from "@features/live-click";
import { ThemeToggleNoSsr } from "@features/theme-toggle";

import { HeaderNav } from "./header-nav";

const menuButtonClass = cn(
    "flex size-11 items-center justify-center rounded-sm border border-zinc-700 bg-zinc-800 text-white transition-opacity hover:opacity-80",
    "dark:border-zinc-500 dark:bg-zinc-700",
);

const sheetClass = cn(
    "fixed inset-0 z-60 flex flex-col bg-white text-zinc-900 [--text-gray:#404040]",
    "animate-header-sheet motion-reduce:animate-none",
    "dark:bg-black dark:text-zinc-50",
    "[.dark_&]:[--text-gray:#a3a3a3]",
);

const sheetItemClass = cn("animate-header-sheet-item motion-reduce:animate-none");

export function HeaderMobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const panelId = useId();
    const t = useTranslations("Header");

    useEffect(function markMounted() {
        setIsMounted(true);
    }, []);

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

    useEffect(
        function focusMenuButton() {
            if (!isOpen) {
                return;
            }

            buttonRef.current?.focus();
        },
        [isOpen],
    );

    const closeMenu = () => setIsOpen(false);

    const menuButton = (
        <button
            ref={buttonRef}
            type="button"
            className={cn(
                menuButtonClass,
                isOpen ? "fixed top-[2vh] right-[1.5vw] z-80" : "relative z-70",
            )}
            aria-expanded={isOpen}
            aria-controls={panelId}
            aria-label={isOpen ? t("Close menu") : t("Open menu")}
            onClick={() => setIsOpen((prev) => !prev)}
        >
            {isOpen ? (
                <X className={cn("size-5")} strokeWidth={2} aria-hidden />
            ) : (
                <Menu className={cn("size-5")} strokeWidth={2} aria-hidden />
            )}
        </button>
    );

    const sheet =
        isMounted && isOpen
            ? createPortal(
                  <div
                      id={panelId}
                      className={sheetClass}
                      role="dialog"
                      aria-modal="true"
                      aria-label={t("Open menu")}
                  >
                      <div
                          className={cn(
                              sheetItemClass,
                              "px-5 pt-[max(1.25rem,env(safe-area-inset-top))] pr-16",
                          )}
                      >
                          <p
                              className={cn(
                                  "font-display text-sm leading-none font-bold tracking-tight",
                              )}
                          >
                              Kim MinChan
                          </p>
                          <p
                              className={cn(
                                  "mt-1.5 text-[11px] tracking-[0.18em] text-(--text-gray) uppercase",
                              )}
                          >
                              Index
                          </p>
                      </div>

                      <div
                          className={cn(
                              sheetItemClass,
                              "flex flex-1 flex-col justify-center px-5 py-8",
                          )}
                      >
                          <HeaderNav
                              orientation="vertical"
                              variant="sheet"
                              onNavigate={closeMenu}
                          />
                      </div>

                      <div
                          className={cn(
                              sheetItemClass,
                              "flex items-end justify-between gap-4 border-t border-black/10 px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]",
                              "dark:border-white/10",
                          )}
                      >
                          <p
                              className={cn(
                                  "text-[11px] leading-relaxed tracking-wide text-(--text-gray)",
                              )}
                          >
                              Seoul, Korea
                              <br />
                              <LiveClock />
                          </p>
                          <ThemeToggleNoSsr />
                      </div>
                  </div>,
                  document.body,
              )
            : null;

    return (
        <div className={cn("shrink-0")}>
            {isOpen ? null : menuButton}
            {isMounted && isOpen ? createPortal(menuButton, document.body) : null}
            {sheet}
        </div>
    );
}
