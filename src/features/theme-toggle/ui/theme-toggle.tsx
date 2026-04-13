"use client";

import { useTheme } from "next-themes";

import { HEADER_DESCRIPTION_FONT, THEME } from "@shared/config";
import { cn } from "@shared/lib";

import { useThemeToggle } from "../model/use-theme-toggle";

export function ThemeToggle() {
    const { theme } = useTheme();
    const { handleLightMode, handleDarkMode } = useThemeToggle();

    return (
        <div className="flex items-center gap-1">
            <button
                type="button"
                className={cn(
                    HEADER_DESCRIPTION_FONT,
                    "cursor-pointer",
                    theme !== THEME.LIGHT && "text-(--text-gray)",
                )}
                onClick={handleLightMode}
            >
                Light Mode
            </button>
            <span className={cn(HEADER_DESCRIPTION_FONT, "text-(--text-gray)")}>
                |
            </span>
            <button
                type="button"
                className={cn(
                    HEADER_DESCRIPTION_FONT,
                    "cursor-pointer",
                    theme !== THEME.DARK && "text-(--text-gray)",
                )}
                onClick={handleDarkMode}
            >
                Dark Mode
            </button>
        </div>
    );
}
