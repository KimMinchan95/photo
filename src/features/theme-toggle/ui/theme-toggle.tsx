"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { DESCRIPTION_FONT, THEME } from "@shared/config";
import { cn } from "@shared/lib";

import { useThemeToggle } from "../model/use-theme-toggle";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function useIsMounted() {
    return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}

export function ThemeToggle() {
    const { resolvedTheme } = useTheme();
    const isMounted = useIsMounted();
    const { handleLightMode, handleDarkMode } = useThemeToggle();
    const activeTheme = isMounted ? resolvedTheme : undefined;

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
