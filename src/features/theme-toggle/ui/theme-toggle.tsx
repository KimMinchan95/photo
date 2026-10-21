"use client";

import { useTheme } from "next-themes";

import { DESCRIPTION_FONT, THEME } from "@shared/config";
import { cn, useIsClient } from "@shared/lib";

import { useThemeToggle } from "../model/use-theme-toggle";

export function ThemeToggle() {
    const { resolvedTheme } = useTheme();
    const isClient = useIsClient();
    const { handleLightMode, handleDarkMode } = useThemeToggle();
    const activeTheme = isClient ? resolvedTheme : undefined;

    return (
        <div className={cn("flex items-center gap-1")}>
            <button
                type="button"
                className={cn(
                    DESCRIPTION_FONT,
                    "cursor-pointer",
                    activeTheme && activeTheme !== THEME.LIGHT && "text-(--text-gray)",
                )}
                onClick={handleLightMode}
            >
                Light Mode
            </button>
            <span className={cn(DESCRIPTION_FONT, "text-(--text-gray)")}>|</span>
            <button
                type="button"
                className={cn(
                    DESCRIPTION_FONT,
                    "cursor-pointer",
                    activeTheme && activeTheme !== THEME.DARK && "text-(--text-gray)",
                )}
                onClick={handleDarkMode}
            >
                Dark Mode
            </button>
        </div>
    );
}
