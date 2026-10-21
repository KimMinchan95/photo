"use client";

import { useTheme } from "next-themes";

import { THEME } from "@shared/config";
import { cn } from "@shared/lib";
import { useIsClient } from "@shared/lib/use-is-client";

import { useThemeToggle } from "../model/use-theme-toggle";

export function ThemeToggle() {
    const { resolvedTheme } = useTheme();
    const isClient = useIsClient();
    const { handleLightMode, handleDarkMode } = useThemeToggle();
    const activeTheme = isClient ? resolvedTheme : undefined;

    return (
        <div className={cn("flex flex-wrap items-center gap-x-1")}>
            <button
                type="button"
                className={cn(
                    "cursor-pointer font-sans text-xs leading-[1.95]",
                    activeTheme && activeTheme !== THEME.LIGHT && "text-(--text-gray)",
                )}
                onClick={handleLightMode}
            >
                Light
            </button>
            <span className={cn("font-sans text-xs leading-[1.95] text-(--text-gray)")}>|</span>
            <button
                type="button"
                className={cn(
                    "cursor-pointer font-sans text-xs leading-[1.95]",
                    activeTheme && activeTheme !== THEME.DARK && "text-(--text-gray)",
                )}
                onClick={handleDarkMode}
            >
                Dark
            </button>
        </div>
    );
}
