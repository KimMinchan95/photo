"use client";

import { cn } from "@shared/lib";
import { DESCRIPTION_FONT } from "@shared/config";
import { useThemeToggle } from "../model/use-theme-toggle";

export function ThemeToggle() {
    const { handleLightMode, handleDarkMode } = useThemeToggle();

    return (
        <div className="flex items-center gap-1">
            <button
                type="button"
                className={cn(DESCRIPTION_FONT, "cursor-pointer")}
                onClick={handleLightMode}
            >
                Light Mode
            </button>
            <span>|</span>
            <button
                type="button"
                className={cn(DESCRIPTION_FONT, "cursor-pointer")}
                onClick={handleDarkMode}
            >
                Dark Mode
            </button>
        </div>
    );
}
